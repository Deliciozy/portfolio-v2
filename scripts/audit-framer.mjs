import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_URL =
  "https://marychen.framer.website/";

const OUTPUT_ROOT =
  path.resolve("framer-audit");

const VIEWPORTS = [
  {
    name: "desktop-1440",
    width: 1440,
    height: 1000,
  },
  {
    name: "tablet-1024",
    width: 1024,
    height: 900,
  },
  {
    name: "mobile-390",
    width: 390,
    height: 844,
  },
];

const STYLE_PROPERTIES = [
  "display",
  "visibility",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",

  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",

  "boxSizing",

  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",

  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",

  "overflow",
  "overflowX",
  "overflowY",

  "flex",
  "flexBasis",
  "flexGrow",
  "flexShrink",
  "flexDirection",
  "flexWrap",

  "justifyContent",
  "justifyItems",
  "justifySelf",

  "alignContent",
  "alignItems",
  "alignSelf",

  "gap",
  "rowGap",
  "columnGap",

  "gridTemplateColumns",
  "gridTemplateRows",
  "gridColumn",
  "gridRow",
  "gridAutoFlow",

  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "fontStretch",

  "lineHeight",
  "letterSpacing",

  "textAlign",
  "textTransform",
  "textDecoration",
  "textOverflow",

  "whiteSpace",
  "wordBreak",

  "color",
  "background",
  "backgroundColor",
  "backgroundImage",
  "backgroundPosition",
  "backgroundSize",

  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",

  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",

  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",

  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",

  "boxShadow",

  "opacity",

  "transform",
  "transformOrigin",

  "filter",
  "backdropFilter",

  "objectFit",
  "objectPosition",

  "aspectRatio",

  "cursor",

  "transition",
  "transitionProperty",
  "transitionDuration",
  "transitionTimingFunction",
  "transitionDelay",

  "animation",
  "animationName",
  "animationDuration",
  "animationTimingFunction",
  "animationDelay",
  "animationIterationCount",
  "animationDirection",
  "animationFillMode",
];

function safeFileName(value) {
  return value
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-");
}

async function extractPageAudit(page) {
  return await page.evaluate(
    ({ STYLE_PROPERTIES }) => {
      function pickStyles(style) {
        const output = {};

        for (const property of STYLE_PROPERTIES) {
          output[property] =
            style[property] ?? "";
        }

        return output;
      }

      function pseudoStyles(
        element,
        pseudo
      ) {
        const style =
          getComputedStyle(
            element,
            pseudo
          );

        const content =
          style.content;

        const meaningful =
          content &&
          content !== "none" &&
          content !== "normal" &&
          content !== '""';

        const hasBackground =
          style.backgroundImage !==
            "none" ||
          style.backgroundColor !==
            "rgba(0, 0, 0, 0)";

        const hasSize =
          parseFloat(style.width) > 0 ||
          parseFloat(style.height) > 0;

        if (
          !meaningful &&
          !hasBackground &&
          !hasSize
        ) {
          return null;
        }

        return pickStyles(style);
      }

      const allElements =
        Array.from(
          document.body.querySelectorAll(
            "*"
          )
        );

      allElements.forEach(
        (element, index) => {
          element.setAttribute(
            "data-audit-id",
            String(index)
          );
        }
      );

      const elements =
        allElements.map(
          (element, index) => {
            const rect =
              element.getBoundingClientRect();

            const style =
              getComputedStyle(
                element
              );

            const text =
              (
                element.innerText ||
                element.textContent ||
                ""
              )
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 300);

            const attributes = {};

            for (
              const attribute
              of element.attributes
            ) {
              if (
                [
                  "id",
                  "class",
                  "role",
                  "aria-label",
                  "href",
                  "src",
                  "alt",
                  "data-framer-name",
                  "data-framer-component-type",
                ].includes(
                  attribute.name
                ) ||
                attribute.name.startsWith(
                  "data-framer"
                )
              ) {
                attributes[
                  attribute.name
                ] = attribute.value;
              }
            }

            const src =
              element instanceof
              HTMLImageElement
                ? element.currentSrc ||
                  element.src
                : null;

            const imageNaturalSize =
              element instanceof
              HTMLImageElement
                ? {
                    width:
                      element.naturalWidth,
                    height:
                      element.naturalHeight,
                  }
                : null;

            return {
              auditId: index,

              tag:
                element.tagName.toLowerCase(),

              id:
                element.id || null,

              className:
                typeof element.className ===
                "string"
                  ? element.className
                  : null,

              text,

              attributes,

              src,

              imageNaturalSize,

              rect: {
                x: rect.x,
                y: rect.y,

                documentX:
                  rect.x +
                  window.scrollX,

                documentY:
                  rect.y +
                  window.scrollY,

                width: rect.width,
                height: rect.height,

                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
              },

              styles:
                pickStyles(style),

              before:
                pseudoStyles(
                  element,
                  "::before"
                ),

              after:
                pseudoStyles(
                  element,
                  "::after"
                ),
            };
          }
        );

      const fonts =
        Array.from(
          document.fonts
        ).map((font) => ({
          family: font.family,
          style: font.style,
          weight: font.weight,
          stretch: font.stretch,
          status: font.status,
        }));

      const styleSheets =
        Array.from(
          document.styleSheets
        ).map((sheet) => {
          let ruleCount = null;

          try {
            ruleCount =
              sheet.cssRules.length;
          } catch {
            ruleCount = null;
          }

          return {
            href:
              sheet.href || null,

            disabled:
              sheet.disabled,

            media:
              sheet.media?.mediaText ||
              "",

            ruleCount,
          };
        });

      return {
        url:
          window.location.href,

        title:
          document.title,

        viewport: {
          width:
            window.innerWidth,
          height:
            window.innerHeight,
          devicePixelRatio:
            window.devicePixelRatio,
        },

        document: {
          scrollWidth:
            document.documentElement
              .scrollWidth,

          scrollHeight:
            document.documentElement
              .scrollHeight,

          bodyWidth:
            document.body
              .getBoundingClientRect()
              .width,

          bodyHeight:
            document.body
              .getBoundingClientRect()
              .height,
        },

        fonts,

        styleSheets,

        elements,
      };
    },
    {
      STYLE_PROPERTIES,
    }
  );
}

async function sampleMotion(
  page,
  viewport
) {
  const scrollRatios = [
    0,
    0.25,
    0.5,
    0.75,
    1,
  ];

  const snapshots = [];

  const totalHeight =
    await page.evaluate(
      () =>
        document.documentElement
          .scrollHeight
    );

  const maxScroll =
    Math.max(
      0,
      totalHeight -
        viewport.height
    );

  for (
    const ratio
    of scrollRatios
  ) {
    const y =
      Math.round(
        maxScroll * ratio
      );

    await page.evaluate(
      (scrollY) => {
        window.scrollTo({
          top: scrollY,
          behavior: "instant",
        });
      },
      y
    );

    await page.waitForTimeout(
      900
    );

    const state =
      await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll(
            "[data-audit-id]"
          )
        )
          .map((element) => {
            const rect =
              element.getBoundingClientRect();

            const style =
              getComputedStyle(
                element
              );

            return {
              auditId:
                Number(
                  element.getAttribute(
                    "data-audit-id"
                  )
                ),

              tag:
                element.tagName
                  .toLowerCase(),

              text:
                (
                  element.innerText ||
                  ""
                )
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 120),

              rect: {
                x: rect.x,
                y: rect.y,
                width:
                  rect.width,
                height:
                  rect.height,
              },

              opacity:
                style.opacity,

              transform:
                style.transform,

              filter:
                style.filter,

              position:
                style.position,

              top:
                style.top,

              animationName:
                style.animationName,

              animationDuration:
                style.animationDuration,

              transition:
                style.transition,
            };
          })
          .filter((item) => {
            return (
              item.opacity !== "1" ||
              item.transform !==
                "none" ||
              item.filter !==
                "none" ||
              item.position ===
                "fixed" ||
              item.position ===
                "sticky" ||
              item.animationName !==
                "none"
            );
          });
      });

    snapshots.push({
      ratio,
      scrollY: y,
      elements: state,
    });
  }

  await page.evaluate(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });

  return snapshots;
}

async function auditViewport(
  browser,
  config
) {
  const context =
    await browser.newContext({
      viewport: {
        width: config.width,
        height: config.height,
      },

      deviceScaleFactor: 1,

      reducedMotion:
        "no-preference",

      colorScheme: "dark",
    });

  const page =
    await context.newPage();

  console.log(
    `\nAuditing ${config.name}...`
  );

  await page.goto(
    TARGET_URL,
    {
      waitUntil:
        "domcontentloaded",

      timeout: 60000,
    }
  );

  await page.waitForTimeout(
    4000
  );

  try {
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
  } catch {
    // Continue even if font readiness fails.
  }

  await page.waitForTimeout(
    1000
  );

  const outputDir =
    path.join(
      OUTPUT_ROOT,
      config.name
    );

  await fs.mkdir(
    outputDir,
    {
      recursive: true,
    }
  );

  const html =
    await page.content();

  await fs.writeFile(
    path.join(
      outputDir,
      "rendered.html"
    ),
    html,
    "utf8"
  );

  const screenshotPath =
    path.join(
      outputDir,
      "full-page.png"
    );

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  const audit =
    await extractPageAudit(
      page
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "computed-styles.json"
    ),
    JSON.stringify(
      audit,
      null,
      2
    ),
    "utf8"
  );

  const motion =
    await sampleMotion(
      page,
      config
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "motion-samples.json"
    ),
    JSON.stringify(
      motion,
      null,
      2
    ),
    "utf8"
  );

  await fs.writeFile(
    path.join(
      outputDir,
      "summary.json"
    ),
    JSON.stringify(
      {
        viewport: config,

        url:
          audit.url,

        title:
          audit.title,

        document:
          audit.document,

        fonts:
          audit.fonts,

        styleSheets:
          audit.styleSheets,

        elementCount:
          audit.elements.length,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(
    `✓ ${config.name} complete`
  );

  await context.close();
}

async function main() {
  await fs.mkdir(
    OUTPUT_ROOT,
    {
      recursive: true,
    }
  );

  const browser =
    await chromium.launch({
      headless: true,
    });

  try {
    for (
      const viewport
      of VIEWPORTS
    ) {
      await auditViewport(
        browser,
        viewport
      );
    }
  } finally {
    await browser.close();
  }

  console.log(
    "\nFramer audit complete."
  );

  console.log(
    `Output: ${OUTPUT_ROOT}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});