import { Feature } from 'toolkit/extension/features/feature';
import { observers } from './observers';
import * as locales from './locales';

export class Localization extends Feature {
  localeStrings = locales[this.settings.enabled]

  constructor() {
    ynabToolKit.localization = {};

    Ember.I18n.translations = {
      ...Ember.I18n.translations,
      ...ynabToolKit.l10nData
    };
  }

  observe(changedNodes) {
    ynabToolKit.l10n.invoke();

    observers.forEach(({ observe, localizer }) => {
      if (observe(changedNodes)) {
        localizer();
      }
    });

    // if (changedNodes.has('budget-inspector') || changedNodes.has('is-checked') || changedNodes.has('budget-inspector-goals')) {
    //   // Inspector edit goal months list.
    //   contentSetter.resetPrefix();
    //   contentSetter.setArray(ynabToolKit.shared.monthsFull, '.budget-inspector-goals .goal-target-month>option', 1, 3);
    // }

    // // Hidden categories modal
    // if (changedNodes.has('modal-overlay ynab-u modal-budget-hidden-categories active')) {
    //   contentSetter.selectorPrefix = '.modal-budget-hidden-categories-master-unhidden:contains("Credit Card Payments")';
    //   contentSetter.set(l10n['toolkit.creditCardPayments'], 1);
    // }

    // // User prefs modal
    // if (changedNodes.has('modal-overlay ynab-u modal-popup modal-user-prefs active')) {
    //   contentSetter.selectorPrefix = '.modal-user-prefs button';
    //   contentSetter.set(l10n['toolkit.myAccount'], 1);
    // }

    // // New transaction fields modals
    // if (changedNodes.has('modal-overlay ynab-u modal-popup modal-account-flags active')) {
    //   contentSetter.selectorPrefix = '.modal-account-flags';
    //   var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'].map(function (color) {
    //     return l10n['toolkit.' + color];
    //   });

    //   contentSetter.setArray(colors, ' .label');
    //   contentSetter.setArray(colors, ' .label-bg');
    // }

    // if (changedNodes.has('modal-overlay ynab-u modal-popup modal-account-dropdown modal-account-categories active')) {
    //   contentSetter.selectorPrefix = '.modal-account-categories ';
    //   contentSetter.setSeveral([l10n['toolkit.inflow'], 0, '.modal-account-categories-section-item'], [l10n['budget.leftToBudget'], 1, '.modal-account-categories-category-name']);
    // }

    // if (changedNodes.has('modal-overlay ynab-u modal-popup modal-account-dropdown modal-account-payees active')) {
    //   contentSetter.selectorPrefix = '.modal-account-payees .is-section-item';
    //   contentSetter.setArray(
    //     [
    //       l10n['toolkit.transfer'],
    //       l10n['toolkit.memorized']
    //     ],
    //     '', 1, 3
    //   );
    // }

    // if (changedNodes.has('modal-overlay ynab-u modal-account-calendar active') ||
    //   changedNodes.has('accounts-calendar')) {
    //   contentSetter.selectorPrefix = '.modal-account-calendar';
    //   var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (day) {
    //     return l10n['toolkit.dayOfWeek' + day];
    //   });

    //   contentSetter.setArray(days, ' .accounts-calendar-weekdays li');
    //   contentSetter.selectorPrefix = '.modal-account-calendar .accounts-calendar-selected-date';
    //   var dateText = $(contentSetter.selectorPrefix).contents()[1].textContent;
    //   var year = dateText.split(' ')[1];
    //   var month = l10n['months.' + dateText.split(' ')[0]];
    //   contentSetter.set(month + ' ' + year, 1);
    // }

    // // Accounts filters months options
    // if (changedNodes.has('modal-overlay ynab-u modal-generic modal-account-filters active')) {
    //   contentSetter.selectorPrefix = '.modal-account-filters ';
    //   contentSetter.setArray(
    //     ynabToolKit.shared.monthsFull,
    //     '.date-range-from-months option'
    //   );
    //   contentSetter.setArray(
    //     ynabToolKit.shared.monthsFull,
    //     '.date-range-to-months option'
    //   );
    // }

    // // Account row
    // if (changedNodes.has('ynab-grid-body')) {
    //   $('.ynab-grid-cell-payeeName[title="Starting Balance"]').contents().each(function () {
    //     if (this.textContent === 'Starting Balance') this.textContent = l10n['toolkit.startingBalance'];
    //   });

    //   $('.ynab-grid-cell-subCategoryName[title="Inflow: To be Budgeted"]').contents().each(function () {
    //     if (this.textContent === 'Inflow: To be Budgeted') this.textContent = l10n['toolkit.inflowTBB'];
    //   });

    //   $('.ynab-grid-cell-subCategoryName[title="Split (Multiple Categories)..."]').contents().each(function () {
    //     if (this.textContent === 'Split (Multiple Categories)...') this.textContent = l10n['toolkit.splitMultipleCategories'];
    //   });
    // }
  }
}

// Tool for setting content.

