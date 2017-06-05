// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// nyt API
var nytAPI = "39ca67d455244b7c8c60dfc2f541ffeb";

// Helper Functions
var helpers = {
	getArticles: (keyWord,beginDate,endDate) => {
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + keyWord + "&begin_date=" + beginDate + "&end_date=" + endDate;

		return axios.get(queryURL).then((response) => {
			//Filter all the articles that don't have snippets or articles that have null or empty snippets
            var articles = response.data.response.docs.filter( article => (article.hasOwnProperty('snippet') && typeof article['snippet'] === 'string' && article['snippet'].length) );
			return articles;
    	});
	},
	getSavedArticles: () => {
		var queryURL = "/api/saved";

		return axios.get(queryURL).then((savedArticles) => {
			return savedArticles.data;
		});
	},
	saveArticle: (title,url) => {
		var queryURL = "/api/saved";

		return axios.post(queryURL,{
			title: title,
			url: url
		}).then((res) => {
			return res.data;
		});
	},
	deleteArticle: (articleId) => {
		var queryURL = "/api/saved";
        return axios({
            method: "delete",
            url: queryURL,
            data: {articleId:articleId},
            params: {}
        }).then((res) => {
			return res;
		});
	},
	normalizeDate: (dt) => {
		return moment(dt).calendar();
	}
};

// Export helpers
export default helpers;