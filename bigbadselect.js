(function ($, window, document) {

  /**
   * The main template
   *
   * @returns {string}
   */
  var mainTmpl = function() {
     return '<div class="bigbadselect">' +
              '<div class="bigbadselect-current-container" tabindex="-1"></div>' +
              '<div class="bigbadselect-options-container" tabindex="-1"></div>' +
            '</div>';
  };

  /**
   * The default template for the currently selected select
   *
   * @param val
   * @param text
   * @returns {String}
   */
  var defaultCurrentTmpl = function(val, text) {
    return text;
  };

  /**
   * The default template for an option
   *
   * @param val
   * @param text
   * @returns {String}
   */
  var defaultOptionTmpl = function(val, text) {
    return text;
  };


  /**
   * Creates a selectified select
   *
   * @param select
   * @constructor
   */
  var Selectify = function(select, currentTmpl, optionTmpl) {
    this.currentTmpl = currentTmpl || defaultCurrentTmpl;
    this.optionTmpl  = optionTmpl || defaultOptionTmpl;
    this.$el = $(mainTmpl());
    this.$currentCont = this.$el.find('.bigbadselect-current-container');
    this.$optionsCont = this.$el.find('.bigbadselect-options-container');
    this.$select = $(select);
    this.$select.addClass('bigbadselected');
    this.$selectedOption = this.$select.find(':selected');
    this.renderCurrent();
    this.addOptions();
    this.bindHandlers();
    this.injectDom();
  };

  Selectify.prototype.renderCurrent = function() {
    this.$currentCont.html(
      this.currentTmpl(this.$selectedOption.val(), this.$selectedOption.text())
    );
  };

  /**
   * Adds all the options from the select
   */
  Selectify.prototype.addOptions = function() {
    this.$select.find('option').each(function(i, option) {
      var $option  = $(option);
      var $sOption = $('<div>');

      // Add the class name
      $sOption.addClass('bigbadselect-option');

      // Add the data-val attribute
      $sOption.attr('data-val', $option.val());

      // Render the option template
      $sOption.html(this.optionTmpl($option.val(), $option.text()));

      // Add a selected class if selected
      if ($option.val() === this.$selectedOption.val()) {
        $sOption.addClass('selected');
      }

      this.$optionsCont.append($sOption);
    }.bind(this));
  };

  Selectify.prototype.bindHandlers = function() {
    this.$currentCont.on('focus', function() {
      this.$optionsCont.show();
      this.$optionsCont.focus();
    }.bind(this));

    this.$optionsCont.on('blur', function() {
      this.$optionsCont.hide();
    }.bind(this));

    this.$optionsCont.on('click', '.bigbadselect-option', function(event) {
      var $sOption = $(event.currentTarget);

      // Hide the options
      this.$optionsCont.hide();

      // Return if the selected one is re-selected
      if ($sOption.attr('data-val') === this.$selectedOption.val()) {
        return;
      }

      // Find the selected class and remove the class
      this.$optionsCont.find('.selected').removeClass('selected');

      // Add the selected class to the new selectify option
      $sOption.addClass('selected');

      // Find the selected value in the select and fire a change event
      this.$select.val($sOption.attr('data-val')).change();

      // Set the newly selected option
      this.$selectedOption = this.$select.find(':selected');

      // Re-render the current
      this.renderCurrent();
    }.bind(this));
  };

  Selectify.prototype.injectDom = function() {
    this.$select.after(this.$el);
    return this;
  };

  // Main entry point
  $.fn.bigbadselect = function(options) {
    options = options || {};
    this.each(function(index, select) {
      new Selectify(select, options.currentTmpl, options.optionTmpl);
    });
    return this;
  };

})(jQuery, window, document);
