import { trackPromise } from 'react-promise-tracker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosResponse } from 'axios';
import api from '../api/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserService = {
  login: (user: string, password: string): Promise<AxiosResponse> =>
    trackPromise(
      api.post(`security/get/token`, JSON.stringify({ user, password })),
    ),
};
export default UserService;
