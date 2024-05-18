$(document).ready(function () {
    // Open the modal
    $("#openModal").click(function () {
        $("#createSection").removeClass("hidden");
    });

    // Close the modal
    $("#cancelButton").click(function () {
        $("#createSection").addClass("hidden");
    });

    // Save button functionality
    $("#saveButton").click(function () {
        let name = $("#nameInput").val();
        if (name === "") {
            toastr.error('Section name cannot be empty');
            return false;
        }
        let noOfChildren = $(".editor-pane").children().length / 2;
        addSection(name, noOfChildren)
        $("#createSection").addClass("hidden");
    });
});
function addSection(sectionName, children) {
    let index = children;
    let editor_template = `
    <h2 id="accordion-color-heading-${index}">
        <button type="button"
            class="accordion-heading flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-color-body-${index}" aria-expanded="false"
            aria-controls="accordion-color-body-${index}">
            <span>${sectionName}</span>
            <div class = "flex justify-end">
                <i id="delete-section" class="fa-solid fa-trash mr-3" data-accordion-target="${index}"></i>
                <i class="fa-solid fa-bars mr-3"></i>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5 5 1 1 5" />
                </svg>
            </div>
        </button>
    </h2>
    <div id="accordion-color-body-${index}" class="hidden" aria-labelledby="accordion-color-heading-${index}">
        <div class="p-5 border space-y-3 border-b-0 border-gray-200 dark:border-gray-700">
        <i id="delete-section" class="fa-solid fa-trash mr-3 cursor-pointer" data-accordion-target="${index}"></i>
            lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor in diam                
        </div>
    </div>
    `
    $(".editor-pane").append(editor_template);
    toastr.success('Section created successfully');
}

// function addPointers() {
//     return true;
// }