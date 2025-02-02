import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './StyleForSearchComonent.css'
interface FormComponentProps {
    value: string;
}

interface SearchComponentProps {
    onSearch: (query: string) => void;
    placeholder: string;
}

const SearchComponent = ({ onSearch, placeholder }: SearchComponentProps) => {
    const { handleSubmit, register, reset, setValue } = useForm<FormComponentProps>();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("query") || "";
        setValue("value", query);
    }, [searchParams, setValue]);

    const customHandler = (formData: FormComponentProps) => {
        const query = formData.value;
        setSearchParams({ query, skip: "0", limit: "10" });
        onSearch(query);
    };

    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <form className={'FormForSearch'} onSubmit={handleSubmit(customHandler)}>
            <input
                type="text"
                placeholder={placeholder}
                {...register("value")}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchComponent;
