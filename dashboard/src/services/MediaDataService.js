import axios from 'axios'

class MediaDataService {
  apiURL = process.env.VUE_APP_BACKEND_API_URL

  getAll(params) {
    return axios.get(
      `${this.apiURL}`,
      { params },
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }

  getSingle(id) {
    return axios.get(`${this.apiURL}/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  store(data) {
    return axios
      .post(`${this.apiURL}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(result => {
        console.log('SUCCESS!!')
        return result
      })
      .catch(() => {
        console.log('FAILURE!!')
      })
  }

  update(id, data) {
    return axios.put(`${this.apiURL}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete(id) {
    return axios.delete(`${this.apiURL}/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}

export default new MediaDataService()
