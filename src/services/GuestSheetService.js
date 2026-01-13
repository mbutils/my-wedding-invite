

const GuestSheetService = {
    // Thay YOUR_DEPLOYED_WEB_APP_URL bằng URL deploy của bạn
    API_URL: import.meta.env.VITE_GUEST_SHEET_APP_URL,
    SHEET_NAME: import.meta.env.VITE_GUEST_SHEET_NAME,
    
    // Lấy danh sách dữ liệu
    async getData() {
        const url = `${this.API_URL}?action=getDataList&sheetName=${this.SHEET_NAME}`;
        const response = await fetch(url);
        return await response.json();
    },
    
    // Thêm dòng mới
    async addRow(data) {
        const url = `${this.API_URL}?action=addRow&sheetName=${this.SHEET_NAME}&data=${encodeURIComponent(JSON.stringify(data))}`;
        const response = await fetch(url);
        return await response.json();
    },
    
    // Sửa dòng
    async updateRow(rowIndex, data) {
        const url = `${this.API_URL}?action=updateRow&sheetName=${this.SHEET_NAME}&rowIndex=${rowIndex}&data=${encodeURIComponent(JSON.stringify(data))}`;
        const response = await fetch(url);
        return await response.json();
    },
    
    // Xóa dòng
    async deleteRow(rowIndex) {
        const url = `${this.API_URL}?action=deleteRow&sheetName=${this.SHEET_NAME}&rowIndex=${rowIndex}`;
        const response = await fetch(url);
        return await response.json();
    }
}

export default GuestSheetService;