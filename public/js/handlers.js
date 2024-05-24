$(document).ready(function () {
  // Populate text inputs with corresponding data from the preview pane
  $('.editor-field').each(function () {
    // var targetSelector = $(this).data('target'); // Get the target selector
    // var previewValue = $(targetSelector).text(); // Get the content from the preview pane
    // $(this).val(previewValue); // Set the text input value
    populateEditorField(this);
  });


  //Event delegation for accordion toggle
  $(document).on('click', '.accordion-heading', function () {
    // Toggle the visibility of the accordion body specified by the data-accordion-target attribute
    $($(this).data('accordion-target')).toggleClass('hidden');
  });

  $(document).on('click', '#delete-section', function () {
    // Toggle the visibility of the accordion body specified by the data-accordion-target attribute
    let index = $(this).attr("data-accordion-target");
    let previewClass = $(this).attr("data-preview-target");
    console.log(index);
    $(`#accordion-color-heading-${index}`).remove();
    $(`#accordion-color-body-${index}`).remove();
    $(`.editable .${previewClass}`).remove();
    toastr.success('Section deleted successfully');
  });

  $(document).on('click', '#delete-sub-section', function () {
    // Toggle the visibility of the accordion body specified by the data-accordion-target attribute
    let index = $(this).attr("data-accordion-target");
    let previewClass = $(this).attr("data-preview-target");
    $(`.${index}`).remove();
    $(`.${previewClass}`).remove();
    toastr.success('Sub-section deleted successfully');
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

  // Event listener to keep the preview pane in sync with the editor pane
  $('.editor-pane').on('input', '.editor-field', function () {
    var targetSelector = $(this).data('target');
    var newValue = $(this).val();
    var $targetElement = $(targetSelector);

    // Check if the target element is an <a> tag
    if ($targetElement.is('a')) {
      $targetElement.attr('href', newValue); // Set href attribute to the new value
    }

    $targetElement.text(newValue); // Set the text content to the new value
  });

});

function populateEditorField(field) {
  var targetSelector = $(field).data('target'); // Get the target selector
  var previewValue = $(targetSelector).text(); // Get the content from the preview pane
  $(field).val(previewValue); // Set the text input value
}

