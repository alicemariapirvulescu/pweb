import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios';
import { LoginPayload, RegisterPayload, HouseRequest, FilterRequest } from './payloads';
import { LoginResponse, RefugeeState, BookingRequest,BookingResponse, HouseResponse } from './reponses';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post('http://localhost:8080/api/login', payload);
      console.log(response.status);
      return response.data;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'login fail' });
    }

  }
)

export const getUser = createAsyncThunk(
  'auth/loginUserWithGoogle',
  async (): Promise<LoginResponse> => {
    try {
      console.log('Start get user');
      const authToken = localStorage.getItem('token');
      const response: AxiosResponse<LoginResponse> = await axios.get('http://localhost:8080/user/me',
        {
          headers: {
            Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
          }
        });
      console.log(" the user is " + response);
      return response.data;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'login fail' });
    }

  }
)

export const updateRoleOfUser = createAsyncThunk(
  'auth/updateRoleOfUser',
  async (payload: string): Promise<any> => {
    try {
      console.log('The user chose the role +' + payload)
      const authToken = localStorage.getItem('token');
      console.log("The token is" + authToken);
      const response: AxiosResponse<any> = await axios.get('http://localhost:8080/refugees/api/dashboard/update-user/' + payload,
        {
          headers: {
            Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
          }
        });
      console.log(" the response is " + response);
      return response.data;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'login fail' });
    }

  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: RegisterPayload): Promise<Number> => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:8080/api/register', payload);
      return response.status;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'register fail' });
    }
  }
)

export const getBookings = createAsyncThunk(
  'auth/getReservations',
  async (): Promise<BookingResponse> => {
    const authToken = localStorage.getItem('token');
    const response: AxiosResponse<BookingResponse> = await axios.get('http://localhost:8080/refugees/api/dashboard/bookings',
      {
        headers: {
          Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
        }
      });
    console.log("Get bookingsd was called")
    return response.data;
  }

)

export const getHouses = createAsyncThunk(
  'auth/getHouses',
  async (): Promise<HouseResponse[]> => {
    const authToken = localStorage.getItem('token');
    const response: AxiosResponse<HouseResponse[]> = await axios.get('http://localhost:8080/refugees/api/dashboard/houses',
      {
        headers: {
          Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
        }
      });
    console.log("Get houses was called");
    return response.data;
  }
)

export const getFilteredHouses = createAsyncThunk(
  'auth/getFitleredHouses',
  async (payload: FilterRequest): Promise<HouseResponse[]> => {
    const authToken = localStorage.getItem('token');
    const response: AxiosResponse<HouseResponse[]> = await axios.post('http://localhost:8080/refugees/api/dashboard/houses/filtered',
    payload,
      {
        headers: {
          Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
        }
      });
    console.log("Get houses filtered was called");
    return response.data;
  }
)

export const getCities = createAsyncThunk(
  'auth/getCities',
  async (): Promise<string[]> => {
    const authToken = localStorage.getItem('token');
    const response: AxiosResponse<string[]> = await axios.get('http://localhost:8080/refugees/api/dashboard/cities',
      {
        headers: {
          Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
        }
      });
    console.log("Get houses was called");
    return response.data;
  }
)


export const getMyHouses = createAsyncThunk(
  'auth/myHouses',
  async (): Promise<HouseResponse[]> => {
    const authToken = localStorage.getItem('token');
    const response: AxiosResponse<HouseResponse[]> = await axios.get('http://localhost:8080/refugees/api/dashboard/my/houses',
      {
        headers: {
          Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
        }
      });
    console.log("Get houses was called");
    return response.data;
  }
)

export const saveHouse = createAsyncThunk(
  'auth/addPlace',
  async (payload: HouseRequest): Promise<Number> => {
    try {
      console.log('adding a new house')
      const authToken = localStorage.getItem('token');
      const response: AxiosResponse = await axios.post('http://localhost:8080/refugees/api/dashboard/save-house', payload,
        {
          headers: {
            Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
          }
        });
      return response.status;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'Save new place failed' });
    }
  }
)


const initialState: RefugeeState =
{
  isLoggedIn: false, user: undefined,
  toastError: '', toastSuccess: '',
  houses: [], myhouses: [], cities: [''],
  houseId: 0, acceptedReservations: [], pendingReservations: []
}

// Then, handle actions in your reducers:
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      console.log('logging out');
      state.isLoggedIn = false;
      sessionStorage.removeItem("token");
    },
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setToastSuccess(state, action: PayloadAction<string>) {
      state.toastSuccess = action.payload;
    },
    setUser(state, action: PayloadAction<RefugeeState['user']>) {
      state.user = action.payload;
    },
    setToastError(state, action: PayloadAction<string>) {
      state.toastError = action.payload;

    }
  },
  // standard reducer logic, with auto-generated action types per reducer
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(loginUser.fulfilled, (state, response) => {
      // Set is Logged in to true
      console.log('login success')
      state.isLoggedIn = true;
      state.user = response.payload;
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Login successful!', type: 'toast' })
    })

    builder.addCase(loginUser.rejected, (state) => {
      // Set is Logged in to false
      state.isLoggedIn = false;
      console.log('login reject')

      authSlice.caseReducers.setToastError(state, { payload: 'Login failed! Wrong credentials', type: 'toast' })

    })

    builder.addCase(registerUser.fulfilled, (state) => {
      // Set is Logged in to true
      console.log('success baby')
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Register successful!', type: 'toast' })
    })

    builder.addCase(registerUser.rejected, (state) => {
      // Set is Logged in to true
      console.log('success baby')
      authSlice.caseReducers.setToastError(state, { payload: 'Register failed!', type: 'toast' })
    })

    builder.addCase(getBookings.fulfilled, (state, response) => {
      // Add reservations to the slice array
      state.acceptedReservations = response.payload.approvedNotifications;
      state.pendingReservations = response.payload.pendingNotifications;
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Get bookings successful!', type: 'toast' })
    })

    builder.addCase(getBookings.rejected, (state, response) => {
      // Add reservations to the slice array
      authSlice.caseReducers.setToastError(state, { payload: 'Get bookings failed!', type: 'toast' })
    })

    builder.addCase(saveHouse.fulfilled, (state, response) => {
      // Set is Logged in to true
      console.log('save place success')
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Add accomodation successful!', type: 'toast' })
    })

    builder.addCase(saveHouse.rejected, (state) => {
      // Set is Logged in to false
      console.log('save place reject')
      authSlice.caseReducers.setToastError(state, { payload: 'Add accomodation failed!', type: 'toast' })

    })

    builder.addCase(getHouses.fulfilled, (state, response) => {
      // Set is Logged in to true
      console.log('save place success');
      state.houses = response.payload;
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Get houses success!', type: 'toast' })

    })

    builder.addCase(getHouses.rejected, (state, response) => {
      // Set is Logged in to true
      console.log('save place success');
      authSlice.caseReducers.setToastError(state, { payload: 'Get houses failed!', type: 'toast' })
    })

    builder.addCase(getFilteredHouses.fulfilled, (state, response) => {
      // Set is Logged in to true
      state.houses = response.payload;
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Get filtered houses success!', type: 'toast' })

    })

    builder.addCase(getFilteredHouses.rejected, (state) => {
      // Set is Logged in to true
      console.log('save place success');
      authSlice.caseReducers.setToastError(state, { payload: 'Get filtered houses failed!', type: 'toast' })
    })

    builder.addCase(getMyHouses.fulfilled, (state, response) => {
      // Set is Logged in to true
      console.log('save place success');
      state.myhouses = response.payload;
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Get my houses success!', type: 'toast' })

    })

    builder.addCase(getMyHouses.rejected, (state, response) => {
      // Set is Logged in to true
      console.log('save place success');
      authSlice.caseReducers.setToastError(state, { payload: 'Get my houses failed!', type: 'toast' })
    })

    builder.addCase(getUser.fulfilled, (state, response) => {
      // Set is Logged in to true
      state.user = response.payload
      localStorage.setItem("token", state.user.token);

      authSlice.caseReducers.setToastSuccess(state, { payload: 'Login with google success!', type: 'toast' })
    })

    builder.addCase(getUser.rejected, (state, response) => {
      // Set is Logged in to true
      authSlice.caseReducers.setToastError(state, { payload: 'Login with google failed!', type: 'toast' })
    })


    builder.addCase(updateRoleOfUser.fulfilled, (state) => {
      console.log('save role reject')
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Set role success!', type: 'toast' })
    })

    builder.addCase(updateRoleOfUser.rejected, (state) => {
      console.log('save role reject')
      authSlice.caseReducers.setToastError(state, { payload: 'Set role failed!', type: 'toast' })
    })

    builder.addCase(getCities.fulfilled, (state, response) => {
      authSlice.caseReducers.setToastSuccess(state, { payload: 'Get cities success!', type: 'toast' })
      state.cities = response.payload ;
    })

    builder.addCase(getCities.rejected, (state) => {
      authSlice.caseReducers.setToastError(state, { payload: 'Get cities failed!', type: 'toast' })
    })

  },

})