function save_options() {
  var colourBlindMode = document.getElementById('colourBlindMode').checked;
  var hideAOM = document.getElementById('hideAOM').checked;
  var checkCreditBalances = document.getElementById('checkCreditBalances').checked;
  var highlightNegativesNegative = document.getElementById('highlightNegativesNegative').checked;
  var enableRetroCalculator = document.getElementById('enableRetroCalculator').checked;
  var budgetRowsHeightSelect = document.getElementById('budgetRowsHeight');
  var budgetRowsHeight = budgetRowsHeightSelect.options[budgetRowsHeightSelect.selectedIndex].value;
  var categoryPopupWidthSelect = document.getElementById('categoryPopupWidth');
  var categoryPopupWidth = categoryPopupWidthSelect.options[categoryPopupWidthSelect.selectedIndex].value;
  var accountsSelectedTotal = document.getElementById('accountsSelectedTotal').checked;

  chrome.storage.sync.set({
    colourBlindMode: colourBlindMode,
    hideAOM: hideAOM,
    checkCreditBalances: checkCreditBalances,
    highlightNegativesNegative: highlightNegativesNegative,
    enableRetroCalculator: enableRetroCalculator,
    budgetRowsHeight: budgetRowsHeight,
    categoryPopupWidth: categoryPopupWidth,
    accountsSelectedTotal: accountsSelectedTotal
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get({
    colourBlindMode: false,
    hideAOM: false,
    checkCreditBalances: false,
    highlightNegativesNegative: false,
    enableRetroCalculator: true,
    budgetRowsHeight: 0,
    categoryPopupWidth: 0,
    accountsSelectedTotal: false
  }, function(items) {
    document.getElementById('colourBlindMode').checked = items.colourBlindMode;
    document.getElementById('hideAOM').checked = items.hideAOM;
    document.getElementById('checkCreditBalances').checked = items.checkCreditBalances;
    document.getElementById('highlightNegativesNegative').checked = items.highlightNegativesNegative;
    document.getElementById('enableRetroCalculator').checked = items.enableRetroCalculator;
    var budgetRowsHeightSelect = document.getElementById('budgetRowsHeight');
    budgetRowsHeightSelect.value = items.budgetRowsHeight;
    var categoryPopupWidthSelect = document.getElementById('categoryPopupWidth');
    categoryPopupWidthSelect.value = items.categoryPopupWidth;
    document.getElementById('accountsSelectedTotal').checked = items.accountsSelectedTotal;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
