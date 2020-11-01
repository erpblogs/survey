odoo.define('main_module.survey_widget_custom', function (require) {
    'use strict';

    var SurveyFormWidget = require('survey.form');

    SurveyFormWidget.include({
        // VALIDATION TOOLS
        // -------------------------------------------------------------------------
        /**
         * Validation is done in frontend before submit to avoid latency from the server.
         * If the validation is incorrect, the errors are displayed before submitting and
         * fade in / out of submit is avoided.
         *
         * Each question type gets its own validation process.
         *
         * There is a special use case for the 'required' questions, where we use the constraint
         * error message that comes from the question configuration ('constr_error_msg' field).
         *
         * @private
         */
        _validateForm: function ($form, formData) {
            var self = this;
            var errors = {};
            var validationEmailMsg = _t("This answer must be an email address.");
            var validationDateMsg = _t("This is not a date");

            this._resetErrors();

            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            var inactiveQuestionIds = this.options.sessionInProgress ? [] : this._getInactiveConditionalQuestionIds();

            $form.find('[data-question-type]').each(function () {
                var $input = $(this);
                var $questionWrapper = $input.closest(".js_question-wrapper");
                var questionId = $questionWrapper.attr('id');

                // If question is inactive, skip validation.
                if (inactiveQuestionIds.includes(parseInt(questionId))) {
                    return;
                }

                var questionRequired = $questionWrapper.data('required');
                var constrErrorMsg = $questionWrapper.data('constrErrorMsg');
                var validationErrorMsg = $questionWrapper.data('validationErrorMsg');
                var datetimepickerFormat = $input.data('questionType') === 'datetime' ? time.getLangDatetimeFormat() : time.getLangDateFormat();

                switch ($input.data('questionType')) {
                    case 'char_box':
                        if (questionRequired && !$input.val()) {
                            errors[questionId] = constrErrorMsg;
                        } else if ($input.val() && $input.attr('type') === 'email' && !self._validateEmail($input.val())) {
                            errors[questionId] = validationEmailMsg;
                        } else {
                            var lengthMin = $input.data('validationLengthMin');
                            var lengthMax = $input.data('validationLengthMax');
                            var length = $input.val().length;
                            if (lengthMin && (lengthMin > length || length > lengthMax)) {
                                errors[questionId] = validationErrorMsg;
                            }
                        }
                        break;
                    case 'numerical_box':
                        if (questionRequired && !data[questionId]) {
                            errors[questionId] = constrErrorMsg;
                        } else {
                            var floatMin = $input.data('validationFloatMin');
                            var floatMax = $input.data('validationFloatMax');
                            var value = parseFloat($input.val());
                            if (floatMin && (floatMin > value || value > floatMax)) {
                                errors[questionId] = validationErrorMsg;
                            }
                        }
                        break;
                    case 'date':
                    case 'datetime':
                        if (questionRequired && !data[questionId]) {
                            errors[questionId] = constrErrorMsg;
                        } else if (data[questionId]) {
                            var momentDate = moment($input.val(), datetimepickerFormat);
                            if (!momentDate.isValid()) {
                                errors[questionId] = validationDateMsg;
                            } else {
                                var $dateDiv = $questionWrapper.find('.o_survey_form_date');
                                var maxDate = $dateDiv.data('maxdate');
                                var minDate = $dateDiv.data('mindate');
                                if ((maxDate && momentDate.isAfter(moment(maxDate)))
                                    || (minDate && momentDate.isBefore(moment(minDate)))) {
                                    errors[questionId] = validationErrorMsg;
                                }
                            }
                        }
                        break;
                    case 'simple_choice_radio':
                    case 'multiple_choice':
                        if (questionRequired) {
                            var $textarea = $questionWrapper.find('textarea');
                            if (!data[questionId]) {
                                errors[questionId] = constrErrorMsg;
                            } else if (data[questionId] === '-1' && !$textarea.val()) {
                                // if other has been checked and value is null
                                errors[questionId] = constrErrorMsg;
                            }
                        }
                        break;
                    case 'matrix':
                        if (questionRequired) {
                            var subQuestionsIds = $questionWrapper.find('table').data('subQuestions');
                            subQuestionsIds.forEach(function (id) {
                                if (!((questionId + '_' + id) in data)) {
                                    errors[questionId] = constrErrorMsg;
                                }
                            });
                        }
                        break;
                }
            });
            if (_.keys(errors).length > 0) {
                this._showErrors(errors);
                return false;
            }
            return true;
        },
    })
});
