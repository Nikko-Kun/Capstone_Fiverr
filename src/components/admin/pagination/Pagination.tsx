
type Props = {
  handlerSubmit: (value: boolean) => void;
  term: number;
  totalRow?: number;
  pageSize: number;
  pageIndex: number;
  handlerSetPageIndex: (index: number) => void;
};

const Pagination = (props: Props) => {
  const renderPagination = () => {
    if (props.totalRow && props.pageSize) {
      const totalPagi = Math.floor(props.totalRow / props.pageSize) + 1;
      const numbers: number[] = Array.from(
        { length: totalPagi },
        (_, index) => index + 1
      );
      return (
        <div>
          {numbers.map((number) => {
            return (
              <button
                onClick={() => props.handlerSetPageIndex(number)}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                key={number}
              >
                {number}
              </button>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="pagination">
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between">
          <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 flex flex-wrap flex-row gap-2">
                Showing
                <span className="font-medium">{1 + props.term}</span>
                to
                <span className="font-medium">
                  {props.totalRow
                    ? props.term + props.pageSize <= props.totalRow
                      ? props.pageSize + props.term
                      : props.totalRow
                    : ""}
                </span>
                of
                <span className="font-medium">{props.totalRow}</span>
                results
              </p>
            </div>
          </div>
          <button
            onClick={() => props.handlerSubmit(false)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => props.handlerSubmit(true)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
