import { useState, KeyboardEvent, useEffect, forwardRef } from "react";
import { Input } from "./input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/*
==== Sample Usage without react-hook-form ====

const MyForm = () => {
  const [tags, setTags] = useState(["tag1", "tag2"]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(tags);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TagInput name="tags" defaultValue={tags} onChange={setTags} />
      <button type="submit">Submit</button>
    </form>
  );
};


==== Example with react-hook-form ====

import { useForm, Controller } from "react-hook-form";

interface FormData {
  tags: string[];
}

const MyForm = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value, ref } }) => (
          <TagInput
            setValue={onChange}
            name="tags"
            defaultValue={value}
            onChange={onChange}
            ref={ref}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};


==== Styling ====
  list
    tag
  input  


=== Note ===
This Component disallows the repetition of tags
*/

interface TagInputProps {
  setValue?: (name: string, value: string[]) => void;
  name: string;
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  listStyle?: string;
  tagStyle?: string;
  inputStyle?: string;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      setValue,
      name,
      defaultValue = [],
      onChange,
      listStyle,
      tagStyle,
      inputStyle,
      placeholder,
    },
    ref
  ) => {
    const [tags, setTags] = useState<string[]>(
      Array.isArray(defaultValue) ? defaultValue : []
    );

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
      // Only update tags if defaultValue changes
      if (
        Array.isArray(defaultValue) &&
        JSON.stringify(defaultValue) !== JSON.stringify(tags)
      ) {
        setTags(defaultValue);
      }
    }, [defaultValue, tags]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue.trim());
      }
    };

    const addTag = (tag: string) => {
      if (tag && !tags.includes(tag)) {
        const updatedTags = [...tags, tag];
        setTags(updatedTags);
        setInputValue("");
        if (setValue) {
          setValue(name, updatedTags);
        }
        if (onChange) {
          onChange(updatedTags);
        }
      }
    };

    const removeTag = (tagToRemove: string) => {
      const updatedTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(updatedTags);
      if (setValue) {
        setValue(name, updatedTags);
      }
      if (onChange) {
        onChange(updatedTags);
      }
    };

    return (
      <div>
        {tags.length > 0 && (
          <ul className={cn("flex gap-2 py-2 flex-wrap", listStyle)}>
            {tags.map((tag, index) => (
              <li
                key={index}
                className={cn(
                  "flex gap-2 items-center bg-[#27272a] text-white py-2 px-3 rounded-md duration-300 animate-out ease-in-out w-max",
                  tagStyle
                )}
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <Input
          type="text"
          ref={ref}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputStyle}
        />
      </div>
    );
  }
);
export default TagInput;
