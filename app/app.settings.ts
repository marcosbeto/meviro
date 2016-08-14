export class AppSettings {
   public static get CATEGORY_LOCOMOTORA(): {} { return {'id':1, 'name':'Locomotora'}; }
   public static get CATEGORY_AUDITIVA(): {} { return {'id':2, 'name':'Auditiva'}; }
   public static get CATEGORY_VISUAL(): {} { return {'id':3, 'name':'Visual'}; }
   public static get ALL_CATEGORIES() {return [this.CATEGORY_LOCOMOTORA, this.CATEGORY_AUDITIVA, this.CATEGORY_VISUAL]}
}
