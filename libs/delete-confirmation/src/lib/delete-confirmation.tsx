import { Button, Modal } from '@mantine/core';
import DeleteConfirmation from './models/delete-confirmation';
export default function DeleteModal(props: DeleteConfirmation) {
  return (
    <Modal opened={props.showModal} onClose={()=>props.hideModal}>
        <div className="text-2xl font-bold text-gray-700">
          Are You Sure To Delete Item ?{' '}
        </div>
        <div className="text-black-700 mb-8  mt-2 text-center font-light">
          Do you really want to delete these records? This process cannot be
          undone.
        </div>
        <div className="flex justify-end">
          <Button
            variant="default"
            className="bg-danger mx-1 rounded px-6 py-2 text-white  hover:bg-red-400 focus:outline-none"
            onClick={()=>props.hideModal}
          >
            No
          </Button>
          <Button
            type="button"
            className="mx-1 rounded bg-primary px-6 py-2 text-teal-200
              hover:bg-primary "
            component="button"
            loading={props.deleteStatus}
            onClick={() => props.confirmModal(props.id)}
          >
            Yes
          </Button>
        </div>
      </Modal>
  );
}
