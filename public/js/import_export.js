$(document).ready(function () {
    $(document).on('click', '#import-data', function () {
        importData();
    });
    $(document).on('click', '#export-data', function () {
        exportData();
    });
})
function exportData() {
    console.log('exporting data');
    let editor_data = $('.editor-pane').html();
    let preview_data = $('.a4-page').html();
    let export_json = {
        "editor-pane": JSON.stringify(editor_data),
        "a4-page": JSON.stringify(preview_data)
    };
    let export_json_string = JSON.stringify(export_json, null, 2); // Pretty print with 2-space indentation
    let blob = new Blob([export_json_string], { type: "application/json" });
    let $link = $('<a>');

    $link.attr('href', URL.createObjectURL(blob));
    $link.attr('download', 'export_data.json');
    $('body').append($link);
    $link[0].click();
    $link.remove();
}


function importData() {
    console.log('importing data');

    // Create a virtual file input element
    var $fileInput = $('<input type="file" accept=".json">');

    // Trigger the file selection dialog
    $fileInput.on('change', function () {
        var file = $fileInput[0].files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            // Parse the JSON data
            var import_json;
            try {
                import_json = JSON.parse(e.target.result);
            } catch (error) {
                console.log('Error parsing JSON:', error);
                return;
            }

            if (import_json['editor-pane']) {
                $('.editor-pane').empty();
                $('.editor-pane').html(JSON.parse(import_json['editor-pane']));
            } else {
                console.log('No data found for editor-pane');
            }

            if (import_json['a4-page']) {
                $('.a4-page').empty();
                $('.a4-page').html(JSON.parse(import_json['a4-page']));
                $('.editor-field').each(function () {
                    populateEditor(this);
                });
                $('#fileInput').change(function () {
                    var file = this.files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            $('#preview-photo').attr('src', event.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                console.log('No data found for a4-page');
            }
        };

        function populateEditor(field) {
            var targetSelector = $(field).data('target'); // Get the target selector
            var previewValue = $(targetSelector).text(); // Get the content from the preview pane
            $(field).val(previewValue); // Set the text input value
        }

        reader.readAsText(file);
    });

    // Open the file selection dialog
    $fileInput.click();
}
