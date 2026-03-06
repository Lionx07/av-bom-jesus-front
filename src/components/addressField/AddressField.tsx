import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface AddressFieldProps {
  data: any;
  onChange: (data: any) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export function AddressField({ data, onChange, onRemove, showRemove }: AddressFieldProps) {
  
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <fieldset className="border border-gray-300 rounded-lg p-6 relative flex flex-row mb-4 items-center">
      <legend className="px-2 text-sm font-semibold text-gray-500">Endereço</legend>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Rua</label>
          <InputText 
            value={data.street} 
            onChange={(e) => updateField("street", e.target.value)} 
            className="p-inputtext-sm" 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Cidade</label>
          <InputText 
            value={data.city} 
            onChange={(e) => updateField("city", e.target.value)} 
            className="p-inputtext-sm" 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Estado</label>
          <InputText 
            value={data.state} 
            onChange={(e) => updateField("state", e.target.value)} 
            className="p-inputtext-sm" 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">CEP</label>
          <InputText 
            value={data.zipCode} 
            onChange={(e) => updateField("zipCode", e.target.value)} 
            className="p-inputtext-sm" 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">País</label>
          <InputText 
            value={data.country} 
            onChange={(e) => updateField("country", e.target.value)} 
            className="p-inputtext-sm" 
          />
        </div>
      </div>

      {showRemove && (
        <Button 
          type="button"
          icon="pi pi-trash" 
          severity="danger"
          text 
          rounded 
          className="absolute !ml-5 top-2 right-2 p-button-sm"
          onClick={onRemove}
        />
      )}
    </fieldset>
  );
}