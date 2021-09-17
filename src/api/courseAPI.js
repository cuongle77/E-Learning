import axiosClient from "./axiosClient";

const courseAPI = {
  getCourseAll: (groupCode) => {
    const url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`;
    return axiosClient.get(url);
  },
};

export default courseAPI;
