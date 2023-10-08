import React, { useEffect, useState } from "react";
import { TrashIcon } from "./icons/trash";
import { PencilIcon } from "./icons/pencil";
import { CreateItem } from "./button/CreateItem";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { getHireWork } from "../../redux/quanLyCongViec/thunkAction";
import {
  GetCongViecResponse,
  QueryDividePage,
  ThueCongViecResponse,
} from "../../react-app-env";
import { useSelector } from "react-redux";
import EyeIcon from "./icons/eye";
import InputForm from "../inputForm/InputForm";
import { useForm } from "react-hook-form";
import { quanLyCongViecService } from "../../services/quanLyCongViec.service";
import { SaveIcon } from "./icons/save";
import clsx from "clsx";
import Toggle from "./toggle/toggle";
import Pagination from "./pagination/Pagination";

type Props = {};

const ManageService = (props: Props) => {
  const dispatch = useAppDispatch();
  const { listHireWork, totalRow } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [term, setTerm] = useState(0);
  const [viewDetail, setViewDetail] = useState<ThueCongViecResponse>();
  const [showForm, setShowForm] = useState(false);
  const [showTabDetail, setShowTabDetail] = useState(false);
  const [detailJob, setDetaiJob] = useState<GetCongViecResponse | null>(null);
  const [isUpdate, setIsUpdate] = useState(true);

  const handlerView = async (id: number) => {
    const res = await quanLyCongViecService.getDetailHireWork(id);
    setViewDetail(res.data.content);
  };

  useEffect(() => {
    const payload: QueryDividePage = {
      pageIndex,
      pageSize,
    };
    dispatch(getHireWork(payload));
  }, [dispatch, pageIndex, pageSize]);

  const { register, handleSubmit, setValue, reset, getValues } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchInforAccount = async () => {
      try {
        const res = await viewDetail;
        setValue("id", res?.id || "");
        setValue("maCongViec", res?.maCongViec || "");
        setValue("maNguoiThue", res?.maNguoiThue || "");
        setValue("ngayThue", res?.ngayThue || "");
        setValue("hoanThanh", res?.hoanThanh || false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInforAccount();
  }, [viewDetail, setValue]);

  const valueForm = getValues();

  const onSubmit = async (cv: any, isUpdate: boolean) => {
    if (cv.id && isUpdate) {
      await quanLyCongViecService.updateDetailHireWork(cv.id, cv);
    } else {
      await quanLyCongViecService.addThueCongViec(cv);
    }
    dispatch(getHireWork({ pageIndex, pageSize }));
  };
  const handleOnchange = async (id: number) => {
    await quanLyCongViecService.completedWork(id);
    dispatch(getHireWork({ pageIndex, pageSize }));
  };

  const renderListHireWork = () => {
    return listHireWork?.map((item: ThueCongViecResponse, index: number) => {
      return (
        <tr className="border-b dark:border-neutral-500" key={index}>
          <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
          <td className="whitespace-nowrap px-6 py-4">
            {item.maCongViec}{" "}
            <button
              className="p-2"
              onClick={() => {
                if (item.maCongViec) {
                  (async () => {
                    const res = await quanLyCongViecService.layChiTietCongViec(
                      item.maCongViec
                    );
                    if (res.data.content) {
                      setShowTabDetail(!showTabDetail);
                      setDetaiJob(res.data.content);
                    }
                  })();
                }
              }}
            >
              <EyeIcon
                className="w-[10px] h-[10px] text-center"
                fill="#003912"
              />
            </button>{" "}
          </td>
          <td className="whitespace-nowrap px-6 py-4">{item.maNguoiThue}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.ngayThue}</td>
          <td className="whitespace-nowrap px-6 py-4">
            <Toggle
              check={item.hoanThanh}
              onChange={() => (item.id ? handleOnchange(item.id) : "")}
            />
          </td>
          <td className="whitespace-nowrap px-6 py-4 flex gap-2">
            <button
              onClick={() => {
                if (item.id) {
                  handlerView(item.id);
                  setShowTabDetail(!showTabDetail);
                  setShowForm(!showForm);
                }
              }}
            >
              <PencilIcon
                className="w-[25px] h-[25px]"
                fill="rgb(159, 159, 7)"
              />
            </button>
            <button
              onClick={async () => {
                if (item.id) {
                  await quanLyCongViecService.deleteHireWork(item.id);
                  dispatch(getHireWork({ pageIndex, pageSize }));
                }
              }}
            >
              <TrashIcon
                className="w-[25px] h-[25px]"
                fill="rgb(120, 12, 12)"
              />
            </button>
          </td>
        </tr>
      );
    });
  };

  const handlerSubmit = (isNext: boolean = true) => {
    if (totalRow) {
      const totalIndex = Math.floor(totalRow / pageSize);
      const conditionNext = pageIndex <= totalIndex && pageIndex >= 1;
      const conditionPre = pageIndex > 1 && pageIndex <= totalIndex + 1;
      if (isNext && conditionNext) {
        setPageIndex(pageIndex + 1);
        setTerm(term + 10);
      }
      if (isNext === false && conditionPre) {
        setPageIndex(pageIndex - 1);
        setTerm(term - 10);
      }
    }
  };
  const handlerSetPageIndex = (index: number) => {
    setPageIndex(index);
    setTerm(pageSize * (index - 1));
  };

  return (
    <div className="manage-service">
      <div className="content relative">
        <div className="group-btn">
          <CreateItem
            className="btn-create"
            nameBtn="Create new service"
            onClick={() => {
              setShowTabDetail(!showTabDetail);
              setShowForm(!showForm);
              reset();
              setIsUpdate(false);
            }}
          />
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
                          Code Work
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Code User
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date Hire
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Button
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderListHireWork()}</tbody>
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
            "tab-detail absolute top-0 left-[10%] w-[80%] bg-color-black p-10 rounded- z-[9]",
            {
              hidden: !showTabDetail,
            }
          )}
        >
          <table
            className={clsx("text-center table m-[20px]", {
              hidden: detailJob === null,
            })}
          >
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-2">Image</th>
                <th className="whitespace-nowrap px-4 py-2">Name Work</th>
                <th className="whitespace-nowrap px-4 py-2">Price</th>
                <th className="whitespace-nowrap px-4 py-2">Star</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                <td className="whitespace-nowrap px-4 py-2">
                  <img
                    src={detailJob?.hinhAnh}
                    alt=""
                    className="w-[50px] h-[50px] rounded-md"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  {" "}
                  <div className="font-bold">{detailJob?.tenCongViec}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  {detailJob?.giaTien}
                  <span>$</span>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  {detailJob?.saoCongViec}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className={clsx(
              "close absolute top-[20px] right-[20px] rounded-md px-2 border cursor-pointer",
              {
                hidden: detailJob === null,
              }
            )}
            onClick={() => {
              setDetaiJob(null);
              setShowTabDetail(!showTabDetail);
            }}
          >
            <span>X</span>
          </div>
          <div
            className={clsx("edit-detail", {
              hidden: !showForm,
            })}
          >
            <form onSubmit={handleSubmit(() => onSubmit(valueForm, isUpdate))}>
              <InputForm
                {...register("id")}
                label="ID"
                type="text"
                disabled={false}
              />
              <InputForm
                {...register("maCongViec")}
                label="Code Word"
                type="text"
                disabled={false}
              />
              <InputForm
                {...register("maNguoiThue")}
                label="Code User"
                type="text"
                disabled={false}
              />
              <InputForm
                {...register("ngayThue")}
                label="Date Hire"
                type="text"
                disabled={false}
              />
              <div className="mt-6 flex gap-4">
                <CreateItem
                  className="btn-create"
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
                    setDetaiJob(null);
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

export default ManageService;
