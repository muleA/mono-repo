/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface DeleteConfirmation{
  showModal: boolean;
  hideModal: boolean;
  confirmModal: any;
  id: string;
  deleteStatus: any;
  itemTobeDeleted?: string;
}
