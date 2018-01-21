package main

import (
	"bytes"
	// "time"
	// "io"
	"encoding/base64"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type scores map[string]float64

type payload struct {
	Scores scores `json:"scores"`
}

var client = http.Client{}

func emotionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	in, _ := ioutil.ReadAll(base64.NewDecoder(base64.StdEncoding, r.Body))
	ereq, err := http.NewRequest("POST", "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize", bytes.NewReader(in))

	if err != nil {
		log.Println(err)
		return
	}

	ereq.Header.Add("Content-Type", "application/octet-stream")
	ereq.Header.Add("Ocp-Apim-Subscription-Key", "82d02a70699f4a3cb0cd5768b7bd1912")

	response, err := (&http.Client{}).Do(ereq)
	defer response.Body.Close()
	if err != nil {
		log.Println(err)
		w.WriteHeader(response.StatusCode)
	}

	b, _ := ioutil.ReadAll(response.Body)

	n, err := w.Write(b)
	if err != nil {
		log.Println(n, err)
	}
}

func main() {
	log.Println("Starting server")

	fs := http.FileServer(http.Dir("../frontend"))
	http.Handle("/", fs)
	http.HandleFunc("/emote", emotionHandler)

	log.Fatal(http.ListenAndServeTLS(":4000", os.Getenv("CERT_PATH"), os.Getenv("KEY_PATH"), nil))
}
