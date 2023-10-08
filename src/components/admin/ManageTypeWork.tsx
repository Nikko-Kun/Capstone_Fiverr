import React, { useEffect, useRef, useState } from "react";
import { TrashIcon } from "./icons/trash";
import { PencilIcon } from "./icons/pencil";
import { CreateItem } from "./button/CreateItem";
import InputSearch from "./input/InputSearch";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { getTypeWorkWithPage } from "../../redux/quanLyCongViec/thunkAction";
import { GetTypeWorkResponse, QueryDividePage } from "../../react-app-env";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { SaveIcon } from "./icons/save";
import InputForm from "../core/InputForm";
import { quanLyCongViecService } from "../../services/quanLyCongViec.service";
import EyeIcon from "./icons/eye";

type Props = {};

const ManageTypeWork = (props: Props) => {
  const dispatch = useAppDispatch();
  const { listTypeWorkWithPage, totalRow } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const numbers: number[] = Array.from({ length: 6 }, (_, index) => index + 1);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [term, setTerm] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [viewDetail, setViewDetail] = useState<GetTypeWorkResponse>();
  const [showForm, setShowForm] = useState(false);
  const [showTabDetail, setShowTabDetail] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const { register, handleSubmit, setValue, reset, getValues } = useForm({
    mode: "onChange",
  });

  let inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const payload: QueryDividePage = {
      pageIndex,
      pageSize,
      keyword,
    };
    dispatch(getTypeWorkWithPage(payload));
  }, [dispatch, pageIndex, pageSize, keyword]);

  useEffect(() => {
    const fetchInforAccount = async () => {
      try {
        const res = await viewDetail;
        setValue("id", res?.id);
        setValue("tenLoaiCongViec", res?.tenLoaiCongViec || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchInforAccount();
  }, [viewDetail, setValue]);

  const handlerView = async (id: number) => {
    const res = await quanLyCongViecService.detailLoaiCongViec(id);
    setViewDetail(res.data.content);
  };

  const valueForm = getValues();
  const onSubmit = async (cv: any, isUpdate: boolean) => {
    if (cv.id && isUpdate) {
      await quanLyCongViecService.updateLoaiCongViec(cv.id, cv);
    } else {
      await quanLyCongViecService.postLoaiCongViec(cv);
    }
    dispatch(getTypeWorkWithPage({ pageIndex, pageSize, keyword }));
  };

  const renderListHireWork = () => {
    return listTypeWorkWithPage?.map(
      (item: GetTypeWorkResponse, index: number) => {
        return (
          <tr className="border-b dark:border-neutral-500" key={index}>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {item.id}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {item.tenLoaiCongViec}
            </td>
            <td className="whitespace-nowrap px-6 py-4 flex gap-2">
              <div
                className={clsx({
                  hidden: !numbers.includes(item.id),
                })}
              >
                <button>
                  <EyeIcon className="w-[25px] h-[25px] #003912" />
                </button>
              </div>
              <div
                className={clsx("flex gap-2", {
                  hidden: numbers.includes(item.id),
                })}
              >
                <button
                  onClick={() => {
                    handlerView(item.id);
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
                    const res = await quanLyCongViecService.deleteLoaiCongViec(
                      item.id
                    );
                    if (res.status === 200) {
                      dispatch(
                        getTypeWorkWithPage({ pageIndex, pageSize, keyword })
                      );
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
      }
    );
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
                          Type Work
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
      </div>
      <div
        className={clsx(
          "tab-detail absolute top-[20%] left-[30%] w-[50%] bg-color-black p-10 rounded-lg",
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
            <InputForm
              {...register("id")}
              label="Id"
              type="number"
              disabled={true}
            />
            <InputForm
              {...register("tenLoaiCongViec")}
              label="Type"
              type="text"
              disabled={false}
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
                className="border text-font-20 btn-create cursor-pointer"
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
  );
};

export default ManageTypeWork;
