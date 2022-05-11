import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios';
import { setTimeout } from 'timers/promises';
import { LoginPayload, RegisterPayload, ReviewPayload } from './payloads';
import { LoginResponse, RestaurantResponse, CategoryReview,  RestaurantState, PersonReview } from './reponses';


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

export const saveReview = createAsyncThunk(
  'auth/saveReview',
  async (payload: ReviewPayload): Promise<Number> => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:8080/api/review', payload);
      return response.status;
    }
    catch (err: any) {
      console.log('am ajuns aici');
      return Promise.reject({ message: 'add review fail' });
    }
  }
)

export const getRestaurants = createAsyncThunk(
  'auth/getRestaurants',
  async (): Promise<RestaurantResponse[]> => {
    const response: AxiosResponse<RestaurantResponse[]> = await axios.get('http://localhost:8080/api/restaurant');
    console.log("Get restaurants was called")
    return response.data;
  }
)

export const getReviews = createAsyncThunk(
  'auth/getReviews',
  async (id: string | undefined): Promise<PersonReview[]> => {
    const response: AxiosResponse<PersonReview[]> = await axios.get('http://localhost:8080/api/review/' + id);
    console.log("Get reviews was called" + id)
    return response.data;
  }
)

export const getRestaurant = createAsyncThunk(
  'auth/getRestaurant',
  async (id: string | undefined): Promise<RestaurantResponse> => {
    console.log("Get restaurant was called with params: " + id);
    const response: AxiosResponse<RestaurantResponse> = await axios.get('http://localhost:8080/api/restaurant/' + id);
    console.log(response.data);
    return response.data;
  }
)

const initialState: RestaurantState =
{
  restaurants: [], restaurant: {} as RestaurantResponse, isLoggedIn: true,
  user: {} as LoginResponse, reviews: [], review: {} as CategoryReview, toastError: '', toastSuccess: '',
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
    setToastSuccess(state, action: PayloadAction<string>) {
      state.toastSuccess = action.payload;

    },
    setToastError(state, action: PayloadAction<string>) {
      state.toastError = action.payload;

    }
  },
  // standard reducer logic, with auto-generated action types per reducer
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getRestaurants.fulfilled, (state, response) => {
      // Add restaurants to the slice array
      state.restaurants = response.payload;
      console.log(state.restaurants);
    })

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

    builder.addCase(getRestaurant.fulfilled, (state, response) => {
      // Add restaurants to the slice array
      state.restaurant = response.payload;
      state.review = response.payload.review;
      console.log(state.restaurant);
    })

    builder.addCase(getReviews.fulfilled, (state, response) => {
      // Add restaurants to the slice array
      state.reviews = response.payload;
      console.log(state.reviews);
    })
  },

})