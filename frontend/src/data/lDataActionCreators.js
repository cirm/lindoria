import { BR_DATA } from './lDataActionConstants';

export function dataUpdate(data) {
  return {
    type: BR_DATA,
    data,
  };
}
