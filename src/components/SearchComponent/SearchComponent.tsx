import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormComponentProps {
    value: string;
}

interface SearchComponentProps {
    onSearch: (query: string) => void;
    placeholder: string;
}

const SearchComponent = ({ onSearch, placeholder }: SearchComponentProps) => {
    const { handleSubmit, register } = useForm<FormComponentProps>();
    const [, setSearchParams] = useSearchParams();

    const customHandler = (formData: FormComponentProps) => {
        const query = formData.value;
        setSearchParams({ query, skip: "0", limit: "10" });
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit(customHandler)}>
            <input
                type="text"
                placeholder={placeholder}
                {...register("value")}
            />
            <button type="submit">🔍 Пошук</button>
        </form>
    );
};

export default SearchComponent;
