import fs from "node:fs/promises";
import path from "node:path";

const AUDIT_ROOT =
  path.resolve("framer-site-audit");

const OUTPUT_ROOT =
  path.resolve(
    "public/images/framer-original"
  );

const PAGES = [
  "about",
  "resume",
  "case-study-1",
  "case-study-2",
  "case-study-3",
];

function getExtension(
  source
) {
  try {
    const url =
      new URL(source);

    const extension =
      path.extname(
        url.pathname
      );

    if (extension) {
      return extension;
    }
  } catch {
    //
  }

  return ".bin";
}

async function download(
  source,
  destination
) {
  const cleanUrl =
    new URL(source);

  cleanUrl.search = "";

  let response;

  try {
    response =
      await fetch(
        cleanUrl.href
      );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }
  } catch {
    response =
      await fetch(source);
  }

  if (!response.ok) {
    throw new Error(
      `Failed: ${source}`
    );
  }

  const buffer =
    Buffer.from(
      await response.arrayBuffer()
    );

  await fs.writeFile(
    destination,
    buffer
  );
}

async function processPage(
  pageName
) {
  const manifestPath =
    path.join(
      AUDIT_ROOT,
      pageName,
      "desktop-1440",
      "images.json"
    );

  const raw =
    await fs.readFile(
      manifestPath,
      "utf8"
    );

  const images =
    JSON.parse(raw);

  const outputDir =
    path.join(
      OUTPUT_ROOT,
      pageName
    );

  await fs.mkdir(
    outputDir,
    {
      recursive: true,
    }
  );

  const localManifest = [];

  console.log(
    `\n${pageName}: ${images.length} images`
  );

  for (
    let index = 0;
    index < images.length;
    index++
  ) {
    const image =
      images[index];

    const source =
      image.src ||
      image.currentSrc;

    if (!source) {
      console.log(
        `⚠ image ${index + 1}: no source`
      );

      continue;
    }

    const extension =
      getExtension(source);

    const number =
      String(
        index + 1
      ).padStart(
        2,
        "0"
      );

    const fileName =
      `image-${number}${extension}`;

    const destination =
      path.join(
        outputDir,
        fileName
      );

    console.log(
      `Downloading ${fileName}`
    );

    try {
      await download(
        source,
        destination
      );

      localManifest.push({
        index:
          index + 1,

        fileName,

        publicPath:
          `/images/framer-original/${pageName}/${fileName}`,

        source,

        naturalWidth:
          image.naturalWidth,

        naturalHeight:
          image.naturalHeight,

        rect:
          image.rect,

        objectFit:
          image.objectFit,

        objectPosition:
          image.objectPosition,
      });

      console.log(
        `✓ ${fileName}`
      );
    } catch (error) {
      console.error(
        `✗ ${fileName}`
      );

      console.error(
        error.message
      );
    }
  }

  await fs.writeFile(
    path.join(
      outputDir,
      "manifest.json"
    ),
    JSON.stringify(
      localManifest,
      null,
      2
    ),
    "utf8"
  );

  console.log(
    `✓ ${pageName} complete`
  );
}

async function main() {
  await fs.mkdir(
    OUTPUT_ROOT,
    {
      recursive: true,
    }
  );

  for (
    const page
    of PAGES
  ) {
    await processPage(
      page
    );
  }

  console.log(
    "\n================================"
  );

  console.log(
    "FRAMER ASSETS DOWNLOAD COMPLETE"
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