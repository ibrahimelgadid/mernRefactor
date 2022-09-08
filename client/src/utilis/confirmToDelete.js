import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const confirmToDelete = (name, deleteitem, param) => {
  withReactContent(Swal)
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--deleteConfirm)",
      cancelButtonColor: "var(--cancelConfirm)",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        withReactContent(Swal).fire({
          title: "Deleted!",
          icon: "success",
          text: `${name} deleted successfully!`,
          timer: 3000,
        });
        deleteitem(param);
      }
    });
};
