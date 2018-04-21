import numpy as np
import pandas as pd
import sys
from collections import Counter


def kNearestNeighbor(trainData, trainDataClass, testData, k):
    distances = []
    targets = []

    for i in range(len(trainData)):
        distance = np.sqrt(np.sum(np.square(testData - trainData[i, :])))
        distances.append([distance, i])

    distances = sorted(distances)

    for i in range(k):
        index = distances[i][1]
        targets.append(trainDataClass[index][0])

    print(Counter(targets).most_common(1)[0][0])

def main():
	df = pd.read_csv('dataSet.csv')
	df.head()  # arastir...
	columns = list(df.columns)

	trainData = np.array(df.ix[:, :4])
	trainDataClass = np.array(df.ix[:, 4:])
	testData = range(4)


	for i in range(1, len(sys.argv), 2):
		index = columns.index(sys.argv[i])
		testData[index] = float(sys.argv[i+1])

	kNearestNeighbor(trainData, trainDataClass, np.array(testData), 5)

if __name__ == "__main__":
	main()