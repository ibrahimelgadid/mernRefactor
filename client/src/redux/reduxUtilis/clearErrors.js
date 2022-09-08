//==================================================================
// clear errors functionality                                         |

import { CLEAR_ERRORS } from "../actions/actionsTypes";

//==================================================================
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
