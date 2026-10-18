import { supabase } from "./supabaseClient";


const ExpenseListService = {
    async searchExpenses(req) {
        const { data, error } = await supabase.rpc('search_expense',
            {
                p_name: req.name,
                p_category: req.category,
                p_status: req.status,
                p_page_index: req.pageIndex,
                p_page_size: req.pageSize
            }
        );
        
        if (error) throw error;
        return data;
    },

}

export default ExpenseListService;