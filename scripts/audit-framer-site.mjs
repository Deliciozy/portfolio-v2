import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ORIGIN =
  "https://marychen.framer.website";

const OUTPUT_ROOT =
  path.resolve(
    "framer-site-audit"
  );

const PAGES = [
  {
    name: "home",
    route: "/",
  },
  {
    name: "about",
    route: "/about页面",
  },
  {
    name: "resume",
    route: "/resume",
  },
  {
    name: "case-study-1",
    route: "/作品集1",
  },
  {
    name: "case-study-2",
    route: "/作品集2",
  },
  {
    name: "case-study-3",
    route: "/作品集3",
  },
];

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

function pageUrl(
  route
) {
  return new URL(
    route,
    ORIGIN
  ).href;
}

async function warmPage(
  page
) {
  await page.waitForTimeout(
    3500
  );

  try {
    await page.evaluate(
      async () => {
        await document.fonts.ready;
      }
    );
  } catch {
    // Continue.
  }

  const height =
    await page.evaluate(
      () =>
        document.documentElement
          .scrollHeight
    );

  const viewportHeight =
    await page.evaluate(
      () =>
        window.innerHeight
    );

  const step =
    Math.max(
      400,
      Math.round(
        viewportHeight * 0.75
      )
    );

  for (
    let y = 0;
    y < height;
    y += step
  ) {
    await page.evaluate(
      (scrollY) => {
        window.scrollTo(
          0,
          scrollY
        );
      },
      y
    );

    await page.waitForTimeout(
      180
    );
  }

  await page.evaluate(
    () => {
      window.scrollTo(
        0,
        0
      );
    }
  );

  await page.waitForTimeout(
    1200
  );
}

async function assignAuditIds(
  page
) {
  await page.evaluate(
    () => {
      const elements =
        Array.from(
          document.body
            .querySelectorAll("*")
        );

      elements.forEach(
        (
          element,
          index
        ) => {
          element.setAttribute(
            "data-audit-id",
            String(index)
          );
        }
      );
    }
  );
}

async function extractAudit(
  page
) {
  return await page.evaluate(
    ({
      styleProperties,
    }) => {
      function pickStyles(
        style
      ) {
        const output = {};

        for (
          const property
          of styleProperties
        ) {
          output[property] =
            style[property] ?? "";
        }

        return output;
      }

      function getPseudo(
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

        const hasContent =
          content &&
          content !== "none" &&
          content !== "normal" &&
          content !== '""';

        const hasBackground =
          style.backgroundImage !==
            "none" ||
          style.backgroundColor !==
            "rgba(0, 0, 0, 0)";

        const hasBox =
          parseFloat(
            style.width
          ) > 0 ||
          parseFloat(
            style.height
          ) > 0;

        if (
          !hasContent &&
          !hasBackground &&
          !hasBox
        ) {
          return null;
        }

        return {
          content,
          styles:
            pickStyles(style),
        };
      }

      const elements =
        Array.from(
          document.querySelectorAll(
            "[data-audit-id]"
          )
        ).map(
          (element) => {
            const rect =
              element.getBoundingClientRect();

            const style =
              getComputedStyle(
                element
              );

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
                  "srcset",
                  "sizes",
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
                ] =
                  attribute.value;
              }
            }

            const text =
              (
                element.innerText ||
                element.textContent ||
                ""
              )
                .replace(
                  /\s+/g,
                  " "
                )
                .trim()
                .slice(
                  0,
                  500
                );

            const isImage =
              element instanceof
              HTMLImageElement;

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

              id:
                element.id ||
                null,

              className:
                typeof element
                  .className ===
                "string"
                  ? element.className
                  : null,

              text,

              attributes,

              rect: {
                x:
                  rect.x,

                y:
                  rect.y,

                documentX:
                  rect.x +
                  window.scrollX,

                documentY:
                  rect.y +
                  window.scrollY,

                width:
                  rect.width,

                height:
                  rect.height,

                top:
                  rect.top,

                right:
                  rect.right,

                bottom:
                  rect.bottom,

                left:
                  rect.left,
              },

              styles:
                pickStyles(
                  style
                ),

              before:
                getPseudo(
                  element,
                  "::before"
                ),

              after:
                getPseudo(
                  element,
                  "::after"
                ),

              image:
                isImage
                  ? {
                      src:
                        element.src,

                      currentSrc:
                        element
                          .currentSrc,

                      srcset:
                        element
                          .srcset,

                      sizes:
                        element
                          .sizes,

                      alt:
                        element
                          .alt,

                      naturalWidth:
                        element
                          .naturalWidth,

                      naturalHeight:
                        element
                          .naturalHeight,
                    }
                  : null,
            };
          }
        );

      const fonts =
        Array.from(
          document.fonts
        ).map(
          (font) => ({
            family:
              font.family,

            style:
              font.style,

            weight:
              font.weight,

            stretch:
              font.stretch,

            status:
              font.status,
          })
        );

      const links =
        Array.from(
          document.querySelectorAll(
            "a"
          )
        ).map(
          (
            element
          ) => {
            const rect =
              element
                .getBoundingClientRect();

            return {
              text:
                (
                  element
                    .innerText ||
                  ""
                )
                  .replace(
                    /\s+/g,
                    " "
                  )
                  .trim(),

              href:
                element.href,

              auditId:
                element
                  .getAttribute(
                    "data-audit-id"
                  ),

              rect: {
                x:
                  rect.x,

                y:
                  rect.y,

                width:
                  rect.width,

                height:
                  rect.height,
              },
            };
          }
        );

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
            document
              .documentElement
              .scrollWidth,

          scrollHeight:
            document
              .documentElement
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

        links,

        elements,
      };
    },
    {
      styleProperties:
        STYLE_PROPERTIES,
    }
  );
}

async function extractImageManifest(
  page
) {
  return await page.evaluate(
    () => {
      return Array.from(
        document.images
      ).map(
        (
          image,
          index
        ) => {
          const rect =
            image.getBoundingClientRect();

          return {
            index,

            auditId:
              image.getAttribute(
                "data-audit-id"
              ),

            src:
              image.src,

            currentSrc:
              image.currentSrc,

            srcset:
              image.srcset,

            sizes:
              image.sizes,

            alt:
              image.alt,

            naturalWidth:
              image.naturalWidth,

            naturalHeight:
              image.naturalHeight,

            rect: {
              x:
                rect.x,

              y:
                rect.y +
                window.scrollY,

              width:
                rect.width,

              height:
                rect.height,
            },

            objectFit:
              getComputedStyle(
                image
              )
                .objectFit,

            objectPosition:
              getComputedStyle(
                image
              )
                .objectPosition,
          };
        }
      );
    }
  );
}

async function extractWebAnimations(
  page
) {
  return await page.evaluate(
    () => {
      return document
        .getAnimations({
          subtree: true,
        })
        .map(
          (
            animation,
            index
          ) => {
            const effect =
              animation.effect;

            const target =
              effect &&
              "target"
              in effect
                ? effect.target
                : null;

            let keyframes = [];
            let timing = null;

            try {
              if (
                effect &&
                "getKeyframes"
                in effect
              ) {
                keyframes =
                  effect
                    .getKeyframes();
              }
            } catch {
              keyframes = [];
            }

            try {
              if (
                effect &&
                "getTiming"
                in effect
              ) {
                timing =
                  effect.getTiming();
              }
            } catch {
              timing = null;
            }

            return {
              index,

              playState:
                animation
                  .playState,

              currentTime:
                animation
                  .currentTime,

              playbackRate:
                animation
                  .playbackRate,

              targetAuditId:
                target instanceof
                Element
                  ? target
                      .getAttribute(
                        "data-audit-id"
                      )
                  : null,

              targetTag:
                target instanceof
                Element
                  ? target
                      .tagName
                      .toLowerCase()
                  : null,

              targetText:
                target instanceof
                Element
                  ? (
                      target
                        .innerText ||
                      ""
                    )
                      .replace(
                        /\s+/g,
                        " "
                      )
                      .trim()
                      .slice(
                        0,
                        150
                      )
                  : "",

              timing,

              keyframes,
            };
          }
        );
    }
  );
}

async function sampleScrollMotion(
  page
) {
  const ratios = [
    0,
    0.1,
    0.25,
    0.5,
    0.75,
    0.9,
    1,
  ];

  const scrollHeight =
    await page.evaluate(
      () =>
        document
          .documentElement
          .scrollHeight
    );

  const viewportHeight =
    await page.evaluate(
      () =>
        window.innerHeight
    );

  const maxScroll =
    Math.max(
      0,
      scrollHeight -
        viewportHeight
    );

  const snapshots = [];

  for (
    const ratio
    of ratios
  ) {
    const y =
      Math.round(
        maxScroll *
          ratio
      );

    await page.evaluate(
      (
        scrollY
      ) => {
        window.scrollTo(
          0,
          scrollY
        );
      },
      y
    );

    await page.waitForTimeout(
      850
    );

    const state =
      await page.evaluate(
        () => {
          return Array.from(
            document
              .querySelectorAll(
                "[data-audit-id]"
              )
          )
            .map(
              (
                element
              ) => {
                const style =
                  getComputedStyle(
                    element
                  );

                const rect =
                  element
                    .getBoundingClientRect();

                return {
                  auditId:
                    element
                      .getAttribute(
                        "data-audit-id"
                      ),

                  tag:
                    element
                      .tagName
                      .toLowerCase(),

                  text:
                    (
                      element
                        .innerText ||
                      ""
                    )
                      .replace(
                        /\s+/g,
                        " "
                      )
                      .trim()
                      .slice(
                        0,
                        120
                      ),

                  x:
                    rect.x,

                  y:
                    rect.y,

                  width:
                    rect.width,

                  height:
                    rect.height,

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
                    style
                      .animationName,

                  animationDuration:
                    style
                      .animationDuration,

                  transition:
                    style
                      .transition,
                };
              }
            )
            .filter(
              (
                item
              ) =>
                item.opacity !==
                  "1" ||
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
        }
      );

    snapshots.push({
      ratio,

      scrollY:
        y,

      elements:
        state,
    });
  }

  await page.evaluate(
    () => {
      window.scrollTo(
        0,
        0
      );
    }
  );

  await page.waitForTimeout(
    500
  );

  return snapshots;
}

async function extractInteractiveStates(
  page
) {
  const selectors = [
    "a",
    "button",
    '[role="button"]',
  ];

  const handles =
    await page.$$(
      selectors.join(",")
    );

  const results = [];

  const maxItems =
    Math.min(
      handles.length,
      40
    );

  for (
    let index = 0;
    index < maxItems;
    index++
  ) {
    const element =
      handles[index];

    try {
      const visible =
        await element
          .isVisible();

      if (!visible) {
        continue;
      }

      const box =
        await element
          .boundingBox();

      if (
        !box ||
        box.width < 2 ||
        box.height < 2
      ) {
        continue;
      }

      const before =
        await element.evaluate(
          (
            node
          ) => {
            const style =
              getComputedStyle(
                node
              );

            return {
              auditId:
                node.getAttribute(
                  "data-audit-id"
                ),

              tag:
                node.tagName
                  .toLowerCase(),

              text:
                (
                  node.innerText ||
                  ""
                )
                  .replace(
                    /\s+/g,
                    " "
                  )
                  .trim(),

              color:
                style.color,

              backgroundColor:
                style
                  .backgroundColor,

              opacity:
                style.opacity,

              transform:
                style.transform,

              borderColor:
                style.borderColor,

              boxShadow:
                style.boxShadow,

              filter:
                style.filter,

              cursor:
                style.cursor,
            };
          }
        );

      await element.hover();

      await page.waitForTimeout(
        350
      );

      const after =
        await element.evaluate(
          (
            node
          ) => {
            const style =
              getComputedStyle(
                node
              );

            return {
              color:
                style.color,

              backgroundColor:
                style
                  .backgroundColor,

              opacity:
                style.opacity,

              transform:
                style.transform,

              borderColor:
                style.borderColor,

              boxShadow:
                style.boxShadow,

              filter:
                style.filter,

              cursor:
                style.cursor,
            };
          }
        );

      results.push({
        before,
        after,
      });
    } catch {
      // Continue.
    }
  }

  return results;
}

async function auditPage(
  browser,
  pageConfig,
  viewport
) {
  const context =
    await browser.newContext({
      viewport: {
        width:
          viewport.width,

        height:
          viewport.height,
      },

      deviceScaleFactor: 1,

      colorScheme: "dark",

      reducedMotion:
        "no-preference",
    });

  const page =
    await context
      .newPage();

  const url =
    pageUrl(
      pageConfig.route
    );

  console.log(
    `\n${pageConfig.name} / ${viewport.name}`
  );

  console.log(
    url
  );

  await page.goto(
    url,
    {
      waitUntil:
        "domcontentloaded",

      timeout:
        90000,
    }
  );

  await warmPage(
    page
  );

  await assignAuditIds(
    page
  );

  const outputDir =
    path.join(
      OUTPUT_ROOT,
      pageConfig.name,
      viewport.name
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

  await page.screenshot({
    path:
      path.join(
        outputDir,
        "full-page.png"
      ),

    fullPage: true,
  });

  const audit =
    await extractAudit(
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

  const images =
    await extractImageManifest(
      page
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "images.json"
    ),
    JSON.stringify(
      images,
      null,
      2
    ),
    "utf8"
  );

  const animations =
    await extractWebAnimations(
      page
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "web-animations.json"
    ),
    JSON.stringify(
      animations,
      null,
      2
    ),
    "utf8"
  );

  const motion =
    await sampleScrollMotion(
      page
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "scroll-motion.json"
    ),
    JSON.stringify(
      motion,
      null,
      2
    ),
    "utf8"
  );

  const interactions =
    await extractInteractiveStates(
      page
    );

  await fs.writeFile(
    path.join(
      outputDir,
      "interactions.json"
    ),
    JSON.stringify(
      interactions,
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
        page:
          pageConfig,

        viewport,

        finalUrl:
          audit.url,

        title:
          audit.title,

        document:
          audit.document,

        fonts:
          audit.fonts,

        links:
          audit.links,

        elementCount:
          audit
            .elements
            .length,

        imageCount:
          images.length,

        animationCount:
          animations.length,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(
    "✓ complete"
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
      const pageConfig
      of PAGES
    ) {
      for (
        const viewport
        of VIEWPORTS
      ) {
        await auditPage(
          browser,
          pageConfig,
          viewport
        );
      }
    }
  } finally {
    await browser.close();
  }

  console.log(
    "\n================================"
  );

  console.log(
    "FULL FRAMER SITE AUDIT COMPLETE"
  );

  console.log(
    "================================"
  );

  console.log(
    OUTPUT_ROOT
  );
}

main().catch(
  (
    error
  ) => {
    console.error(
      error
    );

    process.exit(1);
  }
);