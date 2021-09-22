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

export const roundToThree = (num) => {
  return +(Math.round(num + 'e+3') + 'e-3');
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
  let totalHours = 0;
  let numOfTrainers = 0;
  createArray(numOfStaff).forEach((_, idx) => {
    if (values[`${staffPrefix}#${idx}Ratio`] === 1) {
      numOfTrainers += 1;
    }

    totalHours = totalHours + Number(values[`${staffPrefix}#${idx}Hour`]);
  });

  // Calculate individual share first
  const map = {};
  const sharePerHour = totalTip / totalHours;
  let remainderFromTrainee = 0;
  createArray(numOfStaff).forEach((_, idx) => {
    let share = Number(values[`${staffPrefix}#${idx}Hour`]) * sharePerHour;

    if (values[`${staffPrefix}#${idx}Ratio`] < 1) {
      const remainder = share - share * values[`${staffPrefix}#${idx}Ratio`];
      remainderFromTrainee = remainderFromTrainee + remainder;

      share = share * values[`${staffPrefix}#${idx}Ratio`];
    }

    map[`${staffPrefix}#${idx}`] = share;
  });

  // Add extra tips from trainees to trainers
  createArray(numOfStaff).forEach((_, idx) => {
    if (values[`${staffPrefix}#${idx}Ratio`] === 1) {
      map[`${staffPrefix}#${idx}`] =
        map[`${staffPrefix}#${idx}`] + remainderFromTrainee / numOfTrainers;
    }
  });

  return map;
};
