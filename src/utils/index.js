import { KITCHEN_STAFF_RATIO, WAIT_STAFF_RATIO } from 'src/constants';

export const createArray = (length) => Array.from(Array(length));

export const calculateCash = (values) => {
  const total = Number(values.total) || 0;
  const credit = Number(values.credit) || 0;
  const debit = Number(values.debit) || 0;
  const coupon = Number(values.coupon) || 0;

  return total - credit - debit - coupon;
};

export const calculateCardTip = (values) => {
  const till = Number(values.till) || 0;
  const cash = calculateCash(values);

  return Math.abs(cash) + till;
};

export const calculateTotalTip = (values) => {
  const cardTip = calculateCardTip(values);
  const cashTip = Number(values.cashTip) || 0;

  return cashTip + cardTip;
};

export const roundToTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

export const calculateKitchenTip = (values) => {
  return calculateTotalTip(values) * KITCHEN_STAFF_RATIO;
};

export const calculateWaitTip = (values) => {
  return calculateTotalTip(values) * WAIT_STAFF_RATIO;
};

export const getEmployeesShareMap = (
  values,
  numOfStaff,
  staffPrefix,
  totalTip
) => {
  let staffShareSum = 0;
  createArray(numOfStaff).forEach((_, idx) => {
    staffShareSum =
      staffShareSum +
      values[`${staffPrefix}#${idx}Hour`] *
        values[`${staffPrefix}#${idx}Ratio`];
  });

  const map = {};
  createArray(numOfStaff).forEach((_, idx) => {
    map[`${staffPrefix}#${idx}`] =
      (totalTip *
        (values[`${staffPrefix}#${idx}Hour`] *
          values[`${staffPrefix}#${idx}Ratio`])) /
      staffShareSum;
  });

  return map;
};
