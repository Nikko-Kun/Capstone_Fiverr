export type GetHttpResponse<T> = {
  statusCode: number;
  message?: string;
  content: T;
  dateTime: Date;
};

export type GetTokenResponse<T> = {
  user: T;
  token: string;
};

export type GetCongViecResponse = {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
};

export type GetLoaiCongViecResponse = {
  id: number;
  tenLoaiCongViec: string;
};

export type GetAuthResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar?: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
};

export type GetDangNhapResponse = {
  email: string;
  password: string;
};

export type GetTypeWorkResponse = {
  id: number;
  tenLoaiCongViec: string;
};

export type DetailTypeWork = {
  id: number;
  tenChiTiet: string;
};

export type GroupDetailTypeWork = {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai?: DetailTypeWork[];
};

export type MenuTypeWork = {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai?: GroupDetailTypeWork[];
};

export type ThueCongViecResponse = {
  id?: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
};

export type ResponseByPage<T> = {
  pageIndex : number;
  pageSize : number;
  totalRow : number;
  keywords : string | null;
  data : T[];
}


export type QueryDividePage = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
};

interface CRUD {
  create(newItem: object);
  update(id: number | string, itemUpdate: object);
  search(keyword: string);
  delete(id: number | string);
  getAll();
}
export type BinhLuanResponse = {
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan: string;
  avatar: string;
};

export type AddBinhLuanResponse = {
  id?: number;
  maCongViec: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
};

export type HireWorkOfUserResponse = {
  id: number;
  ngayThue : string;
  hoanThanh : string;
  congViec : GetCongViecResponse
}