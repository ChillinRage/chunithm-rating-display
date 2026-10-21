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


async function initialize() {
  const imageElement = document.getElementById("displayImage");
  const versionSelect = document.getElementById("versionDropdown");

  versionSelect.addEventListener("change", event => {
    imageElement.src = event.target.value;
  });

  const IMAGES = await loadImages();
  IMAGES.map(({version, src, isDefault}) => {
    const option = new Option(version, src);
    versionSelect.add(option);

    if (isDefault) {
      option.selected = true;
      imageElement.src = src;
    }
  });
}

initialize();
