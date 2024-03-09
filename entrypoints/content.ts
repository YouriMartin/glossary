import glossaryFile from "~/assets/glossary.json";

interface Glossary {
  [word: string]: string;
}

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "manifest",

  async main(ctx) {
    const glossary: Glossary = glossaryFile;

    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      onMount(container: HTMLElement) {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
          <div class="modal-content">
            <p id="modal-text"></p>
          </div>
        `;
        container.append(modal);

        const modalText = container.querySelector("#modal-text");

        document.addEventListener("mouseup", (event: MouseEvent) => {
          new Promise<Selection>((resolve, reject) => {
            const selected = window.getSelection();
            if (selected !== null) {
              resolve(selected);
            } else {
              reject;
            }
          }).then((selection) => {
            const selectionRect = selection
              .getRangeAt(0)
              .getBoundingClientRect();
            const selectedText = selection.toString().trim().toLowerCase();

            if (selectedText && glossary[selectedText] && modalText) {
              modalText.textContent = `${selectedText} : ${glossary[selectedText]}`;
              modal.style.display = "block";
              modal.style.position = "absolute";
              modal.style.backgroundColor = "white";
              modal.style.padding = "1px 10px";
              modal.style.borderRadius = "10px";
              modal.style.color = "black";
              modal.style.top = `${selectionRect.top - selectionRect.height}px`;
              modal.style.left = `${selectionRect.right}px`;
            }
          });
        });

        document.addEventListener("mousedown", (event: MouseEvent) => {
          if (!modal.contains(event.target as Node)) {
            modal.style.display = "none";
          }
        });
      },
    });

    ui.mount();
  },
});
