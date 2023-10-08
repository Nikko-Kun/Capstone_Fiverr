import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { getWork } from "../../redux/quanLyCongViec/thunkAction";
import { GetCongViecResponse, QueryDividePage } from "../../react-app-env";
import Pagination from "./pagination/Pagination";
import InputSearch from "./input/InputSearch";
import { CreateItem } from "./button/CreateItem";
import { PencilIcon } from "./icons/pencil";
import { TrashIcon } from "./icons/trash";
import { quanLyCongViecService } from "../../services/quanLyCongViec.service";
import clsx from "clsx";
import { SaveIcon } from "./icons/save";
import InputForm from "../inputForm/InputForm";
import { useForm } from "react-hook-form";
import TextArea from "../textArea/TextArea";
import EyeIcon from "./icons/eye";
// 
type Props = {};

const ManageWork = (props: Props) => {
  const dispatch = useAppDispatch();
  const { listWorkWithPage, totalRow } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const numbers: number[] = Array.from({ length: 35 }, (_, index) => index + 1);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(20);
  const [keyword, setKeyword] = useState("");
  const [term, setTerm] = useState(0);
  const [viewDetail, setViewDetail] = useState<GetCongViecResponse>();
  const [showForm, setShowForm] = useState(false);
  const [showTabDetail, setShowTabDetail] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  let inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, reset, getValues } = useForm({
    mode: "onChange",
  });

  const handlerSubmit = (isNext: boolean = true) => {
    if (totalRow) {
      const totalIndex = Math.floor(totalRow / pageSize);
      const conditionNext = pageIndex <= totalIndex && pageIndex >= 1;
      const conditionPre = pageIndex > 1 && pageIndex <= totalIndex + 1;
      if (isNext && conditionNext) {
        setPageIndex(pageIndex + 1);
        setTerm(term + pageSize);
      }
      if (isNext === false && conditionPre) {
        setPageIndex(pageIndex - 1);
        setTerm(term - pageSize);
      }
    }
  };
  const handlerSetPageIndex = (index: number) => {
    setPageIndex(index);
    setTerm(pageSize * (index - 1));
  };

  useEffect(() => {
    const payload: QueryDividePage = {
      pageIndex,
      pageSize,
      keyword,
    };
    dispatch(getWork(payload));
  }, [dispatch, pageIndex, pageSize, keyword]);

  useEffect(() => {
    const fetchInforAccount = async () => {
      try {
        const res = await viewDetail;
        setValue("id", res?.id || 0);
        setValue("tenCongViec", res?.tenCongViec || "");
        setValue("danhGia", res?.danhGia || 0);
        setValue("giaTien", res?.giaTien || 0);
        setValue("nguoiTao", res?.nguoiTao || 0);
        setValue("hinhAnh", res?.hinhAnh || "");
        setValue("moTa", res?.moTa || "");
        setValue("maChiTietLoaiCongViec", res?.maChiTietLoaiCongViec || 0);
        setValue("moTaNgan", res?.moTaNgan || "");
        setValue("saoCongViec", res?.saoCongViec || 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInforAccount();
  }, [viewDetail, setValue]);

  const handlerView = async (id: number) => {
    const res = await quanLyCongViecService.layChiTietCongViec(id);
    setViewDetail(res.data.content);
  };

  const valueForm = getValues();
  const onSubmit = async (cv: any, isUpdate: boolean) => {
    if (cv.id && isUpdate) {
      await quanLyCongViecService.updateWork(cv.id, cv);
    } else {
      await quanLyCongViecService.addWork(cv);
    }
    dispatch(getWork({ pageIndex, pageSize, keyword }));
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     if (e.target.files) {
  //       let file = e.target.files[0];
  //       let formData = new FormData();
  //       formData.append("formFile", file);
  //       dispatch(uploadAvatar(formData));
  //       alert("Update avatar successfully");
  //     }
  //   } catch (error) {
  //     alert("Update avatar failed");
  //   }
  // };
  const renderListWork = () => {
    return listWorkWithPage?.map((work: GetCongViecResponse, index: number) => {
      return (
        <tr className="border-b dark:border-neutral-500" key={index}>
          <td className=" px-6 py-4 font-medium">{work.id}</td>
          <td className=" px-6 py-4">
            <img src={work.hinhAnh} className="w-[50px] h-[50px]" alt="" />

          </td>
          <td className=" px-6 py-4">{work.tenCongViec}</td>
          <td className=" px-6 py-4">{work.giaTien} $</td>
          <td className=" px-6 py-4 ">{work.danhGia}</td>
          <td className=" px-6 py-4">{work.saoCongViec}</td>
          <td className=" px-6 py-4">
            <div
              className={clsx({
                hidden: !numbers.includes(work.id),
              })}
            >
              <button>
                <EyeIcon className="w-[25px] h-[25px] #003912" />
              </button>
            </div>
            <div
              className={clsx("flex gap-2", {
                hidden: numbers.includes(work.id),
              })}
            >
              <button
                onClick={() => {
                  handlerView(work.id);
                  setShowTabDetail(!showTabDetail);
                  setShowForm(!showForm);
                }}
              >
                <PencilIcon
                  className="w-[25px] h-[25px]"
                  fill="rgb(159, 159, 7)"
                />
              </button>
              <button
                onClick={async () => {
                  const res = await quanLyCongViecService.deleteWork(work.id);
                  if (res.status === 200) {
                    dispatch(getWork({ pageIndex, pageSize, keyword }));
                  }
                }}
              >
                <TrashIcon
                  className="w-[25px] h-[25px]"
                  fill="rgb(120, 12, 12)"
                />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="manage-service">
      <div className="content relative">
        <div className="group-btn">
          <CreateItem
            className="btn-create"
            nameBtn="Create new work"
            onClick={() => {
              setShowTabDetail(!showTabDetail);
              setShowForm(!showForm);
              reset();
              setIsUpdate(false);
            }}
          />
          <div className="flex">
            <InputSearch
              name="search"
              placeholder="Search.."
              type="text"
              ref={inputRef}
            />
            <button
              className="btn-create"
              onClick={() => {
                let newKeyword = inputRef.current?.value;
                if (newKeyword) {
                  setKeyword(newKeyword);
                } else {
                  setKeyword("");
                }
              }}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
        <div className="table-manage">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name Work
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Review
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Start
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderListWork()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          handlerSetPageIndex={handlerSetPageIndex}
          handlerSubmit={handlerSubmit}
          pageSize={pageSize}
          totalRow={totalRow}
          pageIndex={pageIndex}
          term={term}
        />
        <div
          className={clsx(
            "tab-detail absolute top-0 left-[10%] w-[80%] bg-color-black p-10 rounded-lg",
            {
              hidden: !showTabDetail,
            }
          )}
        >
          <div
            className={clsx("edit-detail", {
              hidden: !showForm,
            })}
          >
            <form onSubmit={handleSubmit(() => onSubmit(valueForm, isUpdate))}>
              {/* <InputForm
                {...register("hinhAnh")}
                label="Image"
                type="file"
                disabled={false}
              /> */}

              <InputForm
                {...register("tenCongViec")}
                label="Name Work"
                type="text"
                disabled={false}
              />
              <InputForm
                {...register("giaTien")}
                label="Price"
                type="number"
                disabled={false}
              />
              <InputForm {...register("danhGia")} label="Review" type="text" />
              <TextArea
                rows={10}
                cols={50}
                {...register("moTa")}
                label="Detail"
              />
              <InputForm
                {...register("maChiTietLoaiCongViec")}
                label="Code Type Work"
                type="number"
              />
              <TextArea
                label="Short Des"
                rows={8}
                cols={50}
                {...register("moTaNgan")}
              />
              <InputForm
                {...register("saoCongViec")}
                label="Star"
                type="number"
              />
              <div className="mt-6 flex gap-4">
                <CreateItem
                  className="btn-create"
                  type="submit"
                  onClick={() => {
                    setShowTabDetail(false);
                    setShowForm(false);
                  }}
                >
                  {" "}
                  <SaveIcon />
                </CreateItem>
                <span
                  className="border text-font-20 btn-create"
                  onClick={() => {
                    setShowTabDetail(false);
                    setShowForm(false);
                  }}
                >
                  <span className="text-color-red opacity-[0.7] font-semibold">
                    X
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageWork;
