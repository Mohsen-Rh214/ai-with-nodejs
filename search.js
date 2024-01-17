import { openai } from './openai.js'
import { Document } from '@langchain/core/documents'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'

const movies = [
  {
    id: 1,
    title: 'Stepbrother',
    description: `Comedic journey full of adult humor and awkwardness.`,
  },
  {
    id: 2,
    title: 'The Matrix',
    description: `Deals with alternate realities and questioning what's real.`,
  },
  {
    id: 3,
    title: 'Shutter Island',
    description: `A mind-bending plot with twists and turns.`,
  },
  {
    id: 4,
    title: 'Memento',
    description: `A non-linear narrative that challenges the viewer's perception.`,
  },
  {
    id: 5,
    title: 'Doctor Strange',
    description: `Features alternate dimensions and reality manipulation.`,
  },
  {
    id: 6,
    title: 'Paw Patrol',
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: 'Interstellar',
    description: `Features futuristic space travel with high stakes`,
  },
]

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (item) =>
        new Document({
          pageContent: `Title: ${item.title}\n${item.description}`,
          metadata: { source: item.id, title: item.title },
        })
    ),
    new OpenAIEmbeddings()
  )

const search = async (query, count = 1) => {
  const store = await createStore()
  return store.similaritySearchWithScore(query, count)
}

console.log(await search('something cute and fluffy',4))
