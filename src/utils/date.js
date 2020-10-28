import dayjs from 'dayjs';

/**
 * 日期格式化
 * @param {String|Number|Date} date - 日期数据
 * @param {String} [format='YYYY-MM-DD HH:mm:ss'] - 格式化规则
 * @returns {string}
 */
export function format (date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}
