import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

interface AddNewFieldProps {
    setSelectedField: (value: string) => void;
}
const AddNewField: React.FC<AddNewFieldProps> = ({ setSelectedField }) => {
  return (
    <div>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search..."
                    />
                    <FaSearch className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedField('Checkbox')}>
                Checkbox
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedField('Radio')}>
                Radio
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedField('TextField')}>
                Textfield
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedField('Email')}>
                Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedField('TextArea')}>
                TextArea
            </DropdownMenuItem>
        </DropdownMenuContent>
    </div>
)
}

export default AddNewField
