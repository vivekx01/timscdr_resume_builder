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
        let editableLength = $('.right-lower.main-content .editable').children().length;
        let previewIndex;
        if (editableLength == 0) {
            previewIndex = $(".right-lower.main-content").children().length;
        }
        else {
            previewIndex = editableLength + $(".right-lower.main-content").children().length;
        }
        addSection(name, noOfChildren, previewIndex)
        $("#createSection").addClass("hidden");
    });

    $(document).on('click', '.create-button', function () {
        let action = $(this).attr('data-action');
        let accordionIndex = $(this).attr('data-accordion-target');
        let previewSection = $(this).attr('data-preview-section');
        if (action == "create-title"){
            return true;
        }
        else if (action == "create-adv-title") {
            let adv_title_template = `
            <p class="masters text-xs font-bold mt-2"><span id="preview-ug_degree">BSC COMPUTER SCIENCE</span>
                | <span id="preview-ug_college">Guru Nanak Khalsa College Of Arts, Science and Commerce</span> |
                <span id="preview-ug_cgpa">9.67</span> CGPA | <span id="preview-ug_year">2019-22</span>
            </p>
            `
            let adv_title_editor_template = `
            <div class="space-y-1">
                <label for="proglanguage">Programming Languages:</label>
                <br>
                <label for="dbs">Language 1:</label>
                <input type="text" id="proglanguage1" class="editor-field text-black" data-target="#preview-proglanguage1"
                    placeholder="Enter a programming language" />
                <br>
                <label for="dbs">Language 2:</label>
                <input type="text" id="proglanguage2" class="editor-field text-black" data-target="#preview-proglanguage2"
                    placeholder="Enter a programming language" />
            </div>
            `

            $(`.right-lower.main-content .editable .${previewSection} .section-container`).append(adv_title_template);
            $(`#accordion-color-body-${accordionIndex} .accordion-inner`).append(adv_title_editor_template);
        }
        else if (action == "create-bullet") {
            return true;
        }
        else {
            toastr.error("Invalid action: " + action);
        }
    });
});
function addSection(sectionName, children, pIndex) {
    let index = children;
    let editor_template = `
    <h2 id="accordion-color-heading-${index}">
        <button type="button"
            class="accordion-heading flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-color-body-${index}" aria-expanded="false"
            aria-controls="accordion-color-body-${index}">
            <span>${sectionName}</span>
            <div class = "flex justify-end">
                <i id="delete-section" class="fa-solid fa-trash mr-3" data-accordion-target="${index}" data-preview-target="section-${pIndex}"></i>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5 5 1 1 5" />
                </svg>
            </div>
        </button>
    </h2>
    <div id="accordion-color-body-${index}" class="hidden" aria-labelledby="accordion-color-heading-${index}">
        <div class="accordion-inner p-5 border space-y-3 border-b-0 border-gray-200 dark:border-gray-700">
            <div class="creator-buttons space-x-2">
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-title" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Title</button>
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-adv-title" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Title+url+date</button>
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-bullet" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Bullet point</button>
            </div>            
    </div>
    `
    let preview_template = `
    <div class="section-${pIndex} flex justify-center">
        <div class="section-container h-[100%] w-[90%]">
            <h1
                class="section-title text-md font-bold mt-1 inline-block border-b-2 border-[#303c54]">
                ${sectionName.toUpperCase()}</h1>
        </div>
    </div>
    `
    $(".editor-pane").append(editor_template);
    $(".right-lower.main-content .editable").append(preview_template);
    toastr.success('Section created successfully');
}

// function addPointers() {
//     return true;
// }