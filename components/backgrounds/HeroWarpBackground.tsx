"use client";

import {
  useEffect,
  useRef,
} from "react";

import styles from "./HeroWarpBackground.module.css";

/*
 * Rebuilt directly from the shader implementation
 * used by the original Framer site.
 *
 * Original Framer page:
 *
 * preset = Lava
 * colorMode = custom
 *
 * Custom colors:
 * #121314
 * #E65429
 * #121314
 *
 * Lava geometry:
 * scale = 0.52
 * rotation = 114°
 * proportion = 1
 * distortion = 7 / 50 = 0.14
 * swirl = 18 / 100 = 0.18
 * swirlIterations = 20
 * softness = 1
 * shape = Edge
 * shapeScale = 0.12
 * offset = 717
 *
 * Framer seed:
 * 717 × 10 = 7170
 *
 * Framer initial shader time:
 * 1000 / 120 × 7170
 * = 59,750ms
 *
 * Framer speed=20:
 * cubic-bezier(.65, 0, .88, .77)
 * → 0.1314933488
 */

const INITIAL_TIME =
  59_750;

const MOTION_SPEED =
  0.1314933488;

const VERTEX_SHADER = `#version 300 es

layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

const FRAGMENT_SHADER = `#version 300 es

precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;

uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;

uniform float u_proportion;
uniform float u_softness;

uniform float u_shape;
uniform float u_shapeScale;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(
  vec2 uv,
  float th
) {
  return mat2(
    cos(th),
    sin(th),
    -sin(th),
    cos(th)
  ) * uv;
}

float random(
  vec2 st
) {
  return fract(
    sin(
      dot(
        st.xy,
        vec2(
          12.9898,
          78.233
        )
      )
    ) *
    43758.5453123
  );
}

float noise(
  vec2 st
) {
  vec2 i =
    floor(st);

  vec2 f =
    fract(st);

  float a =
    random(i);

  float b =
    random(
      i +
      vec2(
        1.0,
        0.0
      )
    );

  float c =
    random(
      i +
      vec2(
        0.0,
        1.0
      )
    );

  float d =
    random(
      i +
      vec2(
        1.0,
        1.0
      )
    );

  vec2 u =
    f *
    f *
    (
      3.0 -
      2.0 *
      f
    );

  float x1 =
    mix(
      a,
      b,
      u.x
    );

  float x2 =
    mix(
      c,
      d,
      u.x
    );

  return mix(
    x1,
    x2,
    u.y
  );
}

vec4 blend_colors(
  vec4 c1,
  vec4 c2,
  vec4 c3,
  float mixer,
  float edgesWidth,
  float edge_blur
) {
  vec3 color1 =
    c1.rgb *
    c1.a;

  vec3 color2 =
    c2.rgb *
    c2.a;

  vec3 color3 =
    c3.rgb *
    c3.a;

  float r1 =
    smoothstep(
      0.0 +
      0.35 *
      edgesWidth,

      0.7 -
      0.35 *
      edgesWidth +
      0.5 *
      edge_blur,

      mixer
    );

  float r2 =
    smoothstep(
      0.3 +
      0.35 *
      edgesWidth,

      1.0 -
      0.35 *
      edgesWidth +
      edge_blur,

      mixer
    );

  vec3 blendedColor =
    mix(
      color1,
      color2,
      r1
    );

  float blendedOpacity =
    mix(
      c1.a,
      c2.a,
      r1
    );

  vec3 color =
    mix(
      blendedColor,
      color3,
      r2
    );

  float opacity =
    mix(
      blendedOpacity,
      c3.a,
      r2
    );

  return vec4(
    color,
    opacity
  );
}

void main() {
  vec2 uv =
    gl_FragCoord.xy /
    u_resolution.xy;

  float t =
    0.5 *
    u_time;

  float noiseScale =
    0.0005 +
    0.006 *
    u_scale;

  uv -= 0.5;

  uv *=
    noiseScale *
    u_resolution;

  uv =
    rotate(
      uv,
      u_rotation *
      0.5 *
      PI
    );

  uv /=
    u_pixelRatio;

  uv += 0.5;

  float n1 =
    noise(
      uv *
      1.0 +
      t
    );

  float n2 =
    noise(
      uv *
      2.0 -
      t
    );

  float angle =
    n1 *
    TWO_PI;

  uv.x +=
    4.0 *
    u_distortion *
    n2 *
    cos(angle);

  uv.y +=
    4.0 *
    u_distortion *
    n2 *
    sin(angle);

  float iterationsNumber =
    ceil(
      clamp(
        u_swirlIterations,
        1.0,
        30.0
      )
    );

  for (
    float i = 1.0;
    i <= 30.0;
    i++
  ) {
    if (
      i >
      iterationsNumber
    ) {
      break;
    }

    uv.x +=
      clamp(
        u_swirl,
        0.0,
        2.0
      ) /
      i *
      cos(
        t +
        i *
        1.5 *
        uv.y
      );

    uv.y +=
      clamp(
        u_swirl,
        0.0,
        2.0
      ) /
      i *
      cos(
        t +
        i *
        1.0 *
        uv.x
      );
  }

  float proportion =
    clamp(
      u_proportion,
      0.0,
      1.0
    );

  float shape =
    0.0;

  float mixer =
    0.0;

  if (
    u_shape <
    0.5
  ) {
    vec2 checksShapeUv =
      uv *
      (
        0.5 +
        3.5 *
        u_shapeScale
      );

    shape =
      0.5 +
      0.5 *
      sin(
        checksShapeUv.x
      ) *
      cos(
        checksShapeUv.y
      );

    mixer =
      shape +
      0.48 *
      sign(
        proportion -
        0.5
      ) *
      pow(
        abs(
          proportion -
          0.5
        ),
        0.5
      );
  } else if (
    u_shape <
    1.5
  ) {
    vec2 stripesShapeUv =
      uv *
      (
        0.25 +
        3.0 *
        u_shapeScale
      );

    float f =
      fract(
        stripesShapeUv.y
      );

    shape =
      smoothstep(
        0.0,
        0.55,
        f
      ) *
      smoothstep(
        1.0,
        0.45,
        f
      );

    mixer =
      shape +
      0.48 *
      sign(
        proportion -
        0.5
      ) *
      pow(
        abs(
          proportion -
          0.5
        ),
        0.5
      );
  } else {
    float sh =
      1.0 -
      uv.y;

    sh -=
      0.5;

    sh /=
      noiseScale *
      u_resolution.y;

    sh +=
      0.5;

    float shapeScaling =
      0.2 *
      (
        1.0 -
        u_shapeScale
      );

    shape =
      smoothstep(
        0.45 -
        shapeScaling,

        0.55 +
        shapeScaling,

        sh +
        0.3 *
        (
          proportion -
          0.5
        )
      );

    mixer =
      shape;
  }

  vec4 colorMix =
    blend_colors(
      u_color1,
      u_color2,
      u_color3,
      mixer,

      1.0 -
      clamp(
        u_softness,
        0.0,
        1.0
      ),

      0.01 +
      0.01 *
      u_scale
    );

  fragColor =
    vec4(
      colorMix.rgb,
      colorMix.a
    );
}
`;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader =
    gl.createShader(
      type
    );

  if (!shader) {
    return null;
  }

  gl.shaderSource(
    shader,
    source
  );

  gl.compileShader(
    shader
  );

  if (
    !gl.getShaderParameter(
      shader,
      gl.COMPILE_STATUS
    )
  ) {
    console.error(
      gl.getShaderInfoLog(
        shader
      )
    );

    gl.deleteShader(
      shader
    );

    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext
) {
  const vertexShader =
    createShader(
      gl,
      gl.VERTEX_SHADER,
      VERTEX_SHADER
    );

  const fragmentShader =
    createShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER
    );

  if (
    !vertexShader ||
    !fragmentShader
  ) {
    return null;
  }

  const program =
    gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(
    program,
    vertexShader
  );

  gl.attachShader(
    program,
    fragmentShader
  );

  gl.linkProgram(
    program
  );

  gl.deleteShader(
    vertexShader
  );

  gl.deleteShader(
    fragmentShader
  );

  if (
    !gl.getProgramParameter(
      program,
      gl.LINK_STATUS
    )
  ) {
    console.error(
      gl.getProgramInfoLog(
        program
      )
    );

    gl.deleteProgram(
      program
    );

    return null;
  }

  return program;
}

export default function HeroWarpBackground() {
  const canvasRef =
    useRef<HTMLCanvasElement>(
      null
    );

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl =
      canvas.getContext(
        "webgl2",
        {
          alpha: true,
          antialias: true,
        }
      );

    if (!gl) {
      console.error(
        "WebGL2 is not supported."
      );

      return;
    }

    const program =
      createProgram(
        gl
      );

    if (!program) {
      return;
    }

    gl.useProgram(
      program
    );

    const positionLocation =
      gl.getAttribLocation(
        program,
        "a_position"
      );

    const buffer =
      gl.createBuffer();

    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffer
    );

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1,
        -1,

        1,
        -1,

        -1,
        1,

        -1,
        1,

        1,
        -1,

        1,
        1,
      ]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(
      positionLocation
    );

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const uniforms = {
      time:
        gl.getUniformLocation(
          program,
          "u_time"
        ),

      pixelRatio:
        gl.getUniformLocation(
          program,
          "u_pixelRatio"
        ),

      resolution:
        gl.getUniformLocation(
          program,
          "u_resolution"
        ),

      scale:
        gl.getUniformLocation(
          program,
          "u_scale"
        ),

      rotation:
        gl.getUniformLocation(
          program,
          "u_rotation"
        ),

      color1:
        gl.getUniformLocation(
          program,
          "u_color1"
        ),

      color2:
        gl.getUniformLocation(
          program,
          "u_color2"
        ),

      color3:
        gl.getUniformLocation(
          program,
          "u_color3"
        ),

      proportion:
        gl.getUniformLocation(
          program,
          "u_proportion"
        ),

      softness:
        gl.getUniformLocation(
          program,
          "u_softness"
        ),

      shape:
        gl.getUniformLocation(
          program,
          "u_shape"
        ),

      shapeScale:
        gl.getUniformLocation(
          program,
          "u_shapeScale"
        ),

      distortion:
        gl.getUniformLocation(
          program,
          "u_distortion"
        ),

      swirl:
        gl.getUniformLocation(
          program,
          "u_swirl"
        ),

      swirlIterations:
        gl.getUniformLocation(
          program,
          "u_swirlIterations"
        ),
    };

    /*
     * Exact uniforms produced
     * by the original Framer wrapper.
     */

    gl.uniform1f(
      uniforms.scale,
      0.52
    );

    gl.uniform1f(
      uniforms.rotation,
      114 *
        Math.PI /
        180
    );

    gl.uniform4f(
      uniforms.color1,
      18 / 255,
      19 / 255,
      20 / 255,
      1
    );

    gl.uniform4f(
      uniforms.color2,
      230 / 255,
      84 / 255,
      41 / 255,
      1
    );

    gl.uniform4f(
      uniforms.color3,
      18 / 255,
      19 / 255,
      20 / 255,
      1
    );

    gl.uniform1f(
      uniforms.proportion,
      1
    );

    gl.uniform1f(
      uniforms.softness,
      1
    );

    /*
     * Framer enum:
     * Checks = 0
     * Stripes = 1
     * Edge = 2
     */

    gl.uniform1f(
      uniforms.shape,
      2
    );

    gl.uniform1f(
      uniforms.shapeScale,
      0.12
    );

    gl.uniform1f(
      uniforms.distortion,
      0.14
    );

    gl.uniform1f(
      uniforms.swirl,
      0.18
    );

    gl.uniform1f(
      uniforms.swirlIterations,
      20
    );

    let disposed =
      false;

    let animationFrame =
      0;

    let totalAnimationTime =
      INITIAL_TIME;

    let lastFrameTime =
      performance.now();

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const resize = () => {
      const pixelRatio =
        window.devicePixelRatio ||
        1;

      const width =
        Math.max(
          1,
          canvas.clientWidth *
            pixelRatio
        );

      const height =
        Math.max(
          1,
          canvas.clientHeight *
            pixelRatio
        );

      if (
        canvas.width !==
          width ||
        canvas.height !==
          height
      ) {
        canvas.width =
          width;

        canvas.height =
          height;
      }

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.useProgram(
        program
      );

      gl.uniform2f(
        uniforms.resolution,
        canvas.width,
        canvas.height
      );

      gl.uniform1f(
        uniforms.pixelRatio,
        pixelRatio
      );
    };

    const render = (
      time: number
    ) => {
      if (disposed) {
        return;
      }

      const delta =
        time -
        lastFrameTime;

      lastFrameTime =
        time;

      if (
        !reduceMotion
      ) {
        totalAnimationTime +=
          delta *
          MOTION_SPEED;
      }

      resize();

      gl.clear(
        gl.COLOR_BUFFER_BIT
      );

      gl.useProgram(
        program
      );

      gl.uniform1f(
        uniforms.time,
        totalAnimationTime *
          0.001
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      if (
        !reduceMotion
      ) {
        animationFrame =
          requestAnimationFrame(
            render
          );
      }
    };

    const resizeObserver =
      new ResizeObserver(
        resize
      );

    resizeObserver.observe(
      canvas
    );

    resize();

    render(
      performance.now()
    );

    return () => {
      disposed = true;

      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      if (buffer) {
        gl.deleteBuffer(
          buffer
        );
      }

      gl.deleteProgram(
        program
      );
    };
  }, []);

  return (
    <div
      className={styles.root}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={
          styles.canvas
        }
      />

      <div
        className={
          styles.noise
        }
      />

      <div
        className={
          styles.pattern
        }
      />
    </div>
  );
}