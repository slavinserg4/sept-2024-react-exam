import { useSearchParams } from "react-router-dom";

interface PaginationProps {
    total: number;
    limit: number;
}

const Pagination = ({ total, limit }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const skip = Number(searchParams.get("skip")) || 0;

    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    const goToPage = (page: number) => {
        const newSkip = (page - 1) * limit;
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("skip", newSkip.toString());
            newParams.set("limit", limit.toString());
            return newParams;
        });
    };


    return (
        <div>
            <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
                Prev
            </button>
            <span>
                {" "}
                Page {currentPage} of {totalPages}{" "}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
