require("./style.css");

const Elements = (function () {
	const DOMClasses = {
		DROPDOWN_CONTAINER: "dropdown",
		CURRENT_SELECTION_CONTAINER: "current-selection",
		CURRENT_SELECTION_OPEN: "open",
		DROPDOWN_ITEMS_CONTAINER: "dropdown-items",
		DROPDOWN_ITEMS_HIDDEN: "hidden",
	};

	const makeDropdown = function (items, onChange = null) {
		// Ensure array of list items is not empty
		if (items === undefined || items.length === 0) {
			throw Error("Empty array passed into makeDropdown()");
		}

		const container = document.createElement("div"); // Create the dropdown container
		container.classList.add(DOMClasses.DROPDOWN_CONTAINER);

		const currentSelectionContainer = document.createElement("span"); // Create the clickable dropdown element
		currentSelectionContainer.classList.add(
			DOMClasses.CURRENT_SELECTION_CONTAINER
		);
		currentSelectionContainer.textContent = items[0]; // By default, show the first list item
		currentSelectionContainer.addEventListener("click", (event) => {
			const dropdownContainer = event.currentTarget.closest(
				`.${DOMClasses.DROPDOWN_CONTAINER}`
			);
			openDropdown(dropdownContainer);
		});

		const dropdownItemContainer = document.createElement("div");
		dropdownItemContainer.classList.add(DOMClasses.DROPDOWN_ITEMS_CONTAINER);
		dropdownItemContainer.classList.add(DOMClasses.DROPDOWN_ITEMS_HIDDEN);

		const itemList = document.createElement("ul");
		itemList.addEventListener("click", (event) => {
			if (event.target.tagName === "LI") {
				const clickedLi = event.target;

				const dropdownContainer = clickedLi.closest(
					`.${DOMClasses.DROPDOWN_CONTAINER}`
				);

				const selectedText = clickedLi.textContent;

				handleItemSelection(dropdownContainer, selectedText);
			}
		});

		container.append(currentSelectionContainer, dropdownItemContainer);
		dropdownItemContainer.append(itemList);

		items.forEach((item) => {
			const li = document.createElement("li");
			li.textContent = item;
			itemList.append(li);
		});

		return container;
	};

	const handleItemSelection = function (container, selectedText) {
		setCurrentSelectionText(container, selectedText);
		closeDropdown(container);
	};

	const getCurrentSelectionContainer = (container) =>
		container.querySelector(`.${DOMClasses.CURRENT_SELECTION_CONTAINER}`);

	const setCurrentSelectionText = function (container, text) {
		const currentSelectionContainer = getCurrentSelectionContainer(container);
		currentSelectionContainer.textContent = text; // Set dropdown text to list item text that was clicked
	};

	const openDropdown = function (container) {
		const currentSelectionContainer = getCurrentSelectionContainer(container);
		currentSelectionContainer.classList.add(DOMClasses.CURRENT_SELECTION_OPEN);

		const dropdownItemContainer = container.querySelector(
			`.${DOMClasses.DROPDOWN_ITEMS_CONTAINER}`
		);
		dropdownItemContainer.classList.remove(DOMClasses.DROPDOWN_ITEMS_HIDDEN);
	};

	const closeDropdown = function (container) {
		const currentSelectionContainer = getCurrentSelectionContainer(container);
		currentSelectionContainer.classList.remove(
			DOMClasses.CURRENT_SELECTION_OPEN
		);

		const dropdownItemContainer = container.querySelector(
			`.${DOMClasses.DROPDOWN_ITEMS_CONTAINER}`
		);
		dropdownItemContainer.classList.add(DOMClasses.DROPDOWN_ITEMS_HIDDEN);
	};

	const initDropdown = function () {
		const container = document.querySelector("#container");
		const dropdown = makeDropdown([
			"Test 1",
			"Test of item with a really long name!",
			"Short item 3",
		]);

		container.append(dropdown);
	};

	return { initDropdown };
})();

Elements.initDropdown();
