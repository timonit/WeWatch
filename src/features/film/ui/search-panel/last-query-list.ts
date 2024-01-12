const LSKey = 'last_search';

type SearchList = string[];

export const addQuerySearch = (query: string) => {
  let list: SearchList;

  try {
    const oldList: SearchList = JSON.parse(localStorage.getItem(LSKey) as string);
    
    if (oldList.includes(query)) list = oldList;
    else list = [query, ...oldList];
    
    if (list.length > 20) list.length = 20;
  } catch(err: any) {
    list = [query];
  }

  localStorage.setItem(LSKey, JSON.stringify(list));
}

export const getQuerySearch = (): SearchList => {
  try {
    return JSON.parse(localStorage.getItem(LSKey) as string);
  } catch(error: any) {
    return [];
  }
}
