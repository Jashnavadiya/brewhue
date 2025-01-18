import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  home: {
    section6: {
      time_period: "",
      time_open: "",
      time_close: "",
      address: "",
      number: [""],
    },
    logo: "",
    darkLogo: "",
    section1Img: "",
    section1Text: "",
    section2Heading: "",
    section2Info: [],
    section3Heading: "",
    section3Img: [{ img: "", _id: "" }],
    section4Heading: "",
    section4Pdf: "",
    section5Heading: "",
    section5Comments: [{ logo_name: "", name: "", review: "", date: "", _id: "" }],
  },
  social: {
    insta: [""], // Initially one empty link
    facebook: [""],
    twitter: [""],
    pinterest: [""],
    linkedin: [""],
    yt: [""],
},
  loading: true,  // Add loading state here
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateFormData: (state, action) => {
      const { path, value } = action.payload;
      const keys = path.split('.');
      let temp = state;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    },
    resetFormData: () => initialState,
  },
});

export const { setLoading, setFormData, updateFormData, resetFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
