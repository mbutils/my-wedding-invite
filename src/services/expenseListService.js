import { supabase } from "./supabaseClient";


const ExpenseListService = {
    async searchExpenses(req) {
        const { data, error } = await supabase.rpc('search_expense',
            {
                p_name: req.name,
                p_expense_by: req.expenseBy,
                p_category: req.category,
                p_is_paid: req.isPaid,
                p_page_index: req.pageIndex,
                p_page_size: req.pageSize
            }
        );
        
        if (error) throw error;
        return data;
    },

    async expenseOverview() {
        const { data, error } = await supabase.rpc('expense_overview');
        
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('expense')
            .select('*')
            .eq('id', id);
        
        if (error) throw error;
        return data.length > 0 ? data[0] : null;
    },

    async insertExpense(req) {
        const { data, error } = await supabase
            .from('expense')
            .insert([req]);
        
        if (error) throw error;
    },

    async updateExpense(expenseId, req) {
        const { data, error } = await supabase
            .from('expense')
            .update([req])
            .eq('id', expenseId)
            .select();
        
        if (error) throw error;
    },

    async updatePaid(expenseId, req) {
        const { data, error } = await supabase
            .from('expense')
            .update({ 
                status: req.status,
                expense_date: req.expense_date,
            })
            .eq('id', expenseId)
            .select();
        
        if (error) throw error;
    },
}

export default ExpenseListService;