// html elements
const imageElement = document.getElementById("displayImage");
const versionSelect = document.getElementById("versionDropdown");
const unavailableElement = document.getElementById("imageUnavailable");


async function loadImages() {
  const DATA_FILES = [
    { region: "INTL", path: "./data/intl.json" },
    { region: "JP", path: "./data/jp.json" }
  ];

  const datasets = await Promise.all(
    DATA_FILES.map(async ({ region, path }) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`(${response.status}) Unable to load ${path}`);
      }

      const entries = await response.json();
      return entries
        .slice()
        .reverse()
        .map(entry => ({
          version: `${region} (${entry.version})`,
          src: entry.imageSrc,
          isDefault: Boolean(entry.default)
        }));
    })
  );

  return datasets.flat();
}

function updateImage(src) {
  if (src) {
    imageElement.src = src;
    imageElement.style.display = "block";
    unavailableElement.hidden = true;
  } else {
    imageElement.removeAttribute("src");
    imageElement.style.display = "none";
    unavailableElement.hidden = false;
  }
}


async function initialize() {
  versionSelect.addEventListener("change", event => {
    updateImage(event.target.value);
  });

  const IMAGES = await loadImages();
  IMAGES.map(({version, src, isDefault}) => {
    const option = new Option(version, src);
    versionSelect.add(option);

    if (isDefault) {
      option.selected = true;
      updateImage(src);
    }
  });
}

initialize();
