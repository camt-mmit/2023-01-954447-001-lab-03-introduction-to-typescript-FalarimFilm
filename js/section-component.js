import { createComponent } from "./input-component.js";
export function createSection(componentElement) {
    const tmpSection = componentElement.querySelector("template.app-tmp-section");
    if (tmpSection === null) {
        throw new Error(`Cannot find input template`);
    }
    const sectionsList = tmpSection.parentElement;
    if (sectionsList === null) {
        throw new Error(`Cannot find list container`);
    }
    // const updateResult = () => {
    //     const children= [...sectionsList.children].filter(
    //         (elem) => elem !== tmpSection,
    //         );
    //     const result = children.reduce(
    //         (carry, element) =>
    //         carry +
    //         element.querySelector('input[type="number"].app-cmp-section')
    //             .valueAsNumber,
    //         0,
    //     );
    //     [...componentElement.querySelectorAll('output.app-cmp-result')].forEach(
    //         (elem) => (elem.value = `${result.toLocaleString()}`),
    //     );
    // };
    const updateList = () => {
        // updateResult();
        const children = [...sectionsList.children].filter((elem) => elem !== tmpSection);
        children.forEach((element, i) => {
            [...element.querySelectorAll(".app-cmp-section-no")].forEach((elem) => (elem.textContent = `${i + 1}`));
        });
        console.info(children);
        [
            ...sectionsList.querySelectorAll(".app-cmd-remove-section"),
        ].forEach((elem) => (elem.disabled = children.length === 1));
    };
    const createElement = () => {
        const container = tmpSection.content.cloneNode(true)
            .firstElementChild;
        if (container === null) {
            throw new Error("Cannot find template container");
        }
        container.addEventListener("click", (ev) => {
            if (ev.target?.matches?.(".app-cmd-remove-section")) {
                container.remove();
                updateList();
            }
        });
        sectionsList.append(container);
        createComponent(container);
        updateList();
    };
    componentElement.addEventListener("click", (ev) => {
        if (ev.target?.matches?.(".app-cmd-add-section")) {
            createElement();
        }
    });
    sectionsList.addEventListener("change", (ev) => {
        if (ev.target?.matches?.('input[type="number"].app-cmp-input')) {
            updateResult();
        }
    });
    createElement();
}
function updateResult() {
    throw new Error(`Cannot find input template`);
}
