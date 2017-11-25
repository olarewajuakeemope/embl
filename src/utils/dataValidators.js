import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Validates post datas
 * @class dataValidators
 */
class dataValidators {
  /**
   * Validates the user inputs when trying
   * to log into the application
   * @method validateInput
   * @param {object} data
   * @return {object} - errors
   * @return {boolean} - isValid
   * @memberOf dataValidators
   */

  searchForm(data) {
    this.errors = {};

    if (data.term === undefined || Validator.isEmpty(data.term)) {
      this.errors.term = 'Search term is required';
    }

    if (!data.startDate) {
      this.errors.startDate = 'Start date is required';
    }

    if (!data.endDate) {
      this.errors.endDate = 'End date is required';
    }

    if (data.startDate && data.endDate) {
      const { startDate, endDate } = data;
      const start = startDate.getTime();
      const end = endDate.getTime();
      if (start > end || (
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()
      )
      ) {
        this.errors.startDate = 'Select earlier than End date';
      }
    }
    const errors = this.errors;
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
}

export default new dataValidators();
