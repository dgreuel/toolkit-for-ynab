import { ContentSetter } from '../utils/content-setter';
import { l10nMonth, MonthStyle } from 'toolkit/extension/utils/toolkit';
import { getSelectedMonth } from 'toolkit/extension/utils/ynab';

export const observe = (changedNodes) => {
  return changedNodes.has('budget-header-flexbox') || changedNodes.has('budget-table');
};

export const localize = () => {
  if (!$('.navlink-budget').hasClass('active')) {
    return;
  }

  const contentSetter = new ContentSetter();
  const selectedMonth = getSelectedMonth();
  const monthIndex = selectedMonth.getMonth();
  const previousMonthIndex = monthIndex === 0 ? 12 : monthIndex - 1;
  const currentMonthName = l10nMonth(selectedMonth.getMonth(), MonthStyle.Short);

  contentSetter.setPrefix('.budget-header-');

  const dateYearText = `${currentMonthName} ${selectedMonth.format('YYYY')}`;
  contentSetter.set(dateYearText, 1, 'calendar-date-button');

  contentSetter.setPrefix('.budget-header-totals-cell-name');
  contentSetter.setArray([
    Ember.I18n.translations['budget.fundsFor'].replace('{{currentMonth}}', currentMonthName),
    Ember.I18n.translations['budget.overspentIn'].replace('{{previousMonth}}', l10nMonth(previousMonthIndex, MonthStyle.Short)),
    Ember.I18n.translations['budget.fundedIn'].replace('{{currentMonth}}', currentMonthName)
  ]);
};
