import React from "react";
import { TrashIcon } from "../icons/trash";
import { PencilIcon } from "../icons/pencil";

type Props = {
  
};

const Table = (props: Props) => {
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">
            #
          </th>
          <th scope="col" className="px-6 py-4">
            First
          </th>
          <th scope="col" className="px-6 py-4">
            Last
          </th>
          <th scope="col" className="px-6 py-4">
            Handle
          </th>
          <th scope="col" className="px-6 py-4">
            Button
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
          <td className="whitespace-nowrap px-6 py-4">Mark</td>
          <td className="whitespace-nowrap px-6 py-4">Otto</td>
          <td className="whitespace-nowrap px-6 py-4">@mdo</td>
          <td className="whitespace-nowrap px-6 py-4 flex gap-2">
            <button>
              <PencilIcon
                className="w-[25px] h-[25px]"
                fill="rgb(159, 159, 7)"
              />
            </button>
            <button>
              <TrashIcon
                className="w-[25px] h-[25px]"
                fill="rgb(120, 12, 12)"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
