import glossaryFile from "~/assets/glossary.json";

interface Glossary {
  [word: string]: string;
}

export default defineContentScript({
  matches: ["<all_urls>"],

  async main(ctx) {
    const glossary: Glossary = glossaryFile;
    const getModal: () => HTMLDivElement = () => {
      return Object.assign(document.createElement("div"), {
        style:
          "position: absolute; background-color: white; padding: 1px 10px; border-radius: 10px; color: black",
        className: "modal",
      }) as HTMLDivElement;
    };

    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      onMount(container: HTMLElement) {
        const modal = getModal();
        modal.innerHTML = `
          <div class="modal-content">
            <p id="modal-text"></p>
          </div>
        `;
        container.append(modal);

        const modalText = container.querySelector("#modal-text");

        function updateModalPosition() {
          const selection = window.getSelection();
          if (!selection) return;
          const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
          const selectedText = selection.toString().trim().toLowerCase();

          if (selectedText && glossary[selectedText] && modalText) {
            modalText.innerHTML = `<strong>${selectedText.toUpperCase()} :</strong> ${
              glossary[selectedText]
            }`;
            modal.style.display = "block";
            modal.style.top = `${
              selectionRect.top - selectionRect.height + window.scrollY
            }px`;
            modal.style.left = `${selectionRect.right + window.scrollX}px`;
          } else {
            modal.style.display = "none";
          }
        }

        document.addEventListener("mouseup", updateModalPosition);

        document.addEventListener("mousedown", (event: MouseEvent) => {
          if (!modal.contains(event.target as Node)) {
            modal.style.display = "none";
          }
        });

        window.addEventListener("scroll", updateModalPosition);
      },
    });

    ui.mount();
  },
});
